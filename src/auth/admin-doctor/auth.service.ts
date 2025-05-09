import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SingInDto } from "../dto/sing-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Admin } from "../../admin/models/admin.model";
import { AdminService } from "../../admin/admin.service";
import { DoctorService } from "../../doctor/doctor.service";
import { Doctor } from "../../doctor/models/doctor.model";

@Injectable()
export class ADAuthService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async DoctorgenerateToken(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
      activation_link: doctor.activate_link,
      role: "doctor",
      // full_name: doctor.full_name,
      // email: doctor.email,
      // phone: doctor.phone
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creater: admin.is_creater,
      role: "admin",
      // full_name: admin.full_name,
      // email: admin.email
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async singInAdmin(singInDto: SingInDto, res: Response) {
    const admin = await this.adminService.finByAdminEmail(singInDto.email);

    if (!admin) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.dataValues.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await admin.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async adminsinOut(refresh_token: string, res: Response) {
    const adminDate = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminDate) {
      throw new ForbiddenException("Admin not verified");
    }
    const refresh_tokens = "";
    await this.adminService.UpdateAdminRefresh(adminDate.id, refresh_tokens);
    res.clearCookie("refresh_token");
    const response = {
      message: "Admin chiqarib yuborildi",
    };
    return response;
  }

  async AdminrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const admins = await this.adminService.findAll();
    const admin = admins.find(
      (admin) =>
        admin.refresh_token &&
        bcrypt.compareSync(refresh_token, admin.refresh_token)
    );

    if (!admin) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await admin.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yangi refresh token",
      accessToken: tokens.accessToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singInDoctor(singInDto: SingInDto, res: Response) {
    const doctor = await this.doctorService.finByDoctorEmail(singInDto.email);

    if (!doctor) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      doctor.dataValues.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.DoctorgenerateToken(doctor);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    doctor.refresh_token = hashed_refresh_token;
    await doctor.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async DoctorsinOut(refresh_token: string, res: Response) {
    const doctorDate = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!doctorDate) {
      throw new ForbiddenException("Doctor not verified");
    }
    const refresh_tokens = "";
    await this.doctorService.UpdateDoctorRefresh(doctorDate.id, refresh_tokens);
    res.clearCookie("refresh_token");
    const response = {
      message: "Doktor chiqarib yuborildi",
    };
    return response;
  }

  async DoctorrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const doctors = await this.adminService.findAll();
    const doctor = doctors.find(
      (doctor) =>
        doctor.refresh_token &&
        bcrypt.compare(refresh_token, doctor.refresh_token)
    );
    console.log(doctor?.refresh_token);

    if (!doctor) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(doctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    doctor.refresh_token = hashed_refresh_token;
    await doctor.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yangi refresh token",
      accessToken: tokens.accessToken,
    };
  }
}
