import { Request, Response } from "express";
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { USAuthService } from "./auth.service";
import { SingInDto } from "../dto/sing-in.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { CreatePatientDto } from "../../patient/dto/create-patient.dto";
import { CreateStaffDto } from "../../staff/dto/create-staff.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Authentication - Avtorizatsiya(Staff va Patient)")
@Controller("auth")
export class USAuthController {
  constructor(private readonly authService: USAuthService) {}

  @Post("staff-sing-up")
  @ApiOperation({ summary: "Shifokor uchun ro'yxatdan o'tish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({
    status: 400,
    description: "Shifokor ro'yxatdan o'tishda xatolik",
  })
  async singUpStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.authService.singUpStaff(createStaffDto);
  }

  @Post("staff-sing-in")
  @ApiOperation({ summary: "Shifokor tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Noto'g'ri ma'lumotlar" })
  async singInStaff(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInStaff(singInDto, res);
  }

  @Post("staff-sing-out")
  @ApiOperation({ summary: "Shifokor tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimdan chiqdi",
  })
  @ApiResponse({ status: 400, description: "Chiqishda xatolik yuz berdi" })
  async StaffsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.StaffsinOut(refreshToke, res);
  }

  @Post("staff-refresh")
  @ApiOperation({ summary: "Shifokor tokenini yangilash" })
  @ApiResponse({ status: 200, description: "Shifokorning tokeni yangilandi" })
  @ApiResponse({ status: 401, description: "Token yangilanishida xatolik" })
  async StaffrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.StaffrefreshToken(req, res);
  }

  // -------------------------------------------------------------------------------------------------

  @Post("patient-sing-up")
  @ApiOperation({ summary: "Bemor uchun ro'yxatdan o'tish" })
  @ApiResponse({
    status: 201,
    description: "Bemor muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({
    status: 400,
    description: "Bemor ro'yxatdan o'tishda xatolik",
  })
  async singUpPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.singUpPatient(createPatientDto);
  }

  @Post("patient-sing-in")
  @ApiOperation({ summary: "Bemor tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Noto'g'ri ma'lumotlar" })
  async singInPatient(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInPatient(singInDto, res);
  }

  @Post("patient-sing-out")
  @ApiOperation({ summary: "Bemor tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli tizimdan chiqdi",
  })
  @ApiResponse({ status: 400, description: "Chiqishda xatolik yuz berdi" })
  async patientsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.patientsinOut(refreshToke, res);
  }

  @Post("patient-refresh")
  @ApiOperation({ summary: "Bemor tokenini yangilash" })
  @ApiResponse({ status: 200, description: "Bemorning tokeni yangilandi" })
  @ApiResponse({ status: 401, description: "Token yangilanishida xatolik" })
  async PatientrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.PatientrefreshToken(req, res);
  }
}
