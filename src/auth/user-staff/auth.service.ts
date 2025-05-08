import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SingInDto } from "../dto/sing-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Staff } from "../../staff/models/staff.model";
import { StaffService } from "../../staff/staff.service";
import { Patient } from "../../patient/models/patient.model";
import { PatientService } from "../../patient/patient.service";
import { CreatePatientDto } from "../../patient/dto/create-patient.dto";
import { CreateStaffDto } from "../../staff/dto/create-staff.dto";

@Injectable()
export class USAuthService {
  constructor(
    private readonly staffService: StaffService,
    private readonly patientService: PatientService,
    private readonly jwtService: JwtService
  ) {}

  async StaffgenerateToken(staff: Staff) {
    const payload = {
      id: staff.id,
      is_active: staff.is_active,
      activation_link: staff.activate_link,
      // full_name: staff.full_name,
      // email: staff.email,
      // phone: staff.phone
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

  async PatientgenerateToken(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
      activation_link: patient.activate_link,
      // full_name: patient.full_name,
      // email: patient.email
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

  async singUpPatient(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientService.finByPatientEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newpatient = await this.patientService.create(createPatientDto);
    return { message: "Foydalanuvchi qo'shildi", patientId: newpatient.id };
  }

  async singInPatient(singInDto: SingInDto, res: Response) {
    const patient = await this.patientService.finByPatientEmail(
      singInDto.email
    );

    if (!patient) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    if (!patient.is_active) {
      throw new BadRequestException("Avval emailni tasqdilang");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      patient.dataValues.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.PatientgenerateToken(patient);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    patient.refresh_token = hashed_refresh_token;
    await patient.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async patientsinOut(refresh_token: string, res: Response) {
    const patientDate = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!patientDate) {
      throw new ForbiddenException("Patient not verified");
    }
    const refresh_tokens = "";
    await this.patientService.UpdatePatientRefresh(
      patientDate.id,
      refresh_tokens
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "Patient chiqarib yuborildi",
    };
    return response;
  }

  async PatientrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const patients = await this.patientService.findAll();
    const patient = patients.find(
      (patient) =>
        patient.refresh_token &&
        bcrypt.compareSync(refresh_token, patient.refresh_token)
    );

    if (!patient) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.PatientgenerateToken(patient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    patient.refresh_token = hashed_refresh_token;
    await patient.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yangi refresh token",
      accessToken: tokens.accessToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singUpStaff(createStaffDto: CreateStaffDto) {
    const candidate = await this.staffService.finByStaffEmail(
      createStaffDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newstaff = await this.staffService.create(createStaffDto);
    return { message: "Foydalanuvchi qo'shildi", staffId: newstaff.id };
  }

  async singInStaff(singInDto: SingInDto, res: Response) {
    const staff = await this.staffService.finByStaffEmail(singInDto.email);

    if (!staff) {
      throw new BadRequestException("Email yoki passwor hato");
    }
    if (!staff.is_active) {
      throw new BadRequestException("Avval emailni tasqdilang");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      staff.dataValues.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.StaffgenerateToken(staff);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    staff.refresh_token = hashed_refresh_token;
    await staff.save();
    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async StaffsinOut(refresh_token: string, res: Response) {
    const staffDate = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!staffDate) {
      throw new ForbiddenException("Staff not verified");
    }
    const refresh_tokens = "";
    await this.staffService.UpdateStaffRefresh(staffDate.id, refresh_tokens);
    res.clearCookie("refresh_token");
    const response = {
      message: "Staff chiqarib yuborildi",
    };
    return response;
  }

  async StaffrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const staffs = await this.staffService.findAll();
    const staff = staffs.find(
      (staff) =>
        staff.refresh_token &&
        bcrypt.compare(refresh_token, staff.refresh_token)
    );
    console.log(staff?.refresh_token);

    if (!staff) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.StaffgenerateToken(staff);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    staff.refresh_token = hashed_refresh_token;
    await staff.save();

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Yangi refresh token",
      accessToken: tokens.accessToken,
    };
  }
}
