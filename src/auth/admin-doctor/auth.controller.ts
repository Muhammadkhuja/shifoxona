import { Request, Response } from "express";
import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ADAuthService } from "./auth.service";
import { SingInDto } from "../dto/sing-in.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Authentication - Avtorizatsiya (Admin va Doktor)")
@Controller("auth")
export class ADAuthController {
  constructor(private readonly authService: ADAuthService) {}

  @Post("admin-sing-in")
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Noto'g'ri ma'lumotlar" })
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Post("admin-sing-out")
  @ApiOperation({ summary: "Admin tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimdan chiqdi",
  })
  @ApiResponse({ status: 400, description: "Chiqishda xatolik yuz berdi" })
  async adminsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminsinOut(refreshToke, res);
  }

  @Post("admin-refresh")
  @ApiOperation({ summary: "Admin tokenini yangilash" })
  @ApiResponse({ status: 200, description: "Adminning tokeni yangilandi" })
  @ApiResponse({ status: 401, description: "Token yangilanishida xatolik" })
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

  @Post("doctor-sing-in")
  @ApiOperation({ summary: "Shifokor tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Noto'g'ri ma'lumotlar" })
  async singInDoctor(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInDoctor(singInDto, res);
  }

  @Post("doctor-sing-out")
  @ApiOperation({ summary: "Shifokor tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimdan chiqdi",
  })
  @ApiResponse({ status: 400, description: "Chiqishda xatolik yuz berdi" })
  async DoctorsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.DoctorsinOut(refreshToke, res);
  }

  @Post("doctor-refresh")
  @ApiOperation({ summary: "Shifokor tokenini yangilash" })
  @ApiResponse({ status: 200, description: "Shifokorning tokeni yangilandi" })
  @ApiResponse({ status: 401, description: "Token yangilanishida xatolik" })
  async DoctorrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.DoctorrefreshToken(req, res);
  }
}
