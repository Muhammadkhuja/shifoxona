
import { Request, Response } from "express";
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { USAuthService } from "./auth.service";
import { SingInDto } from "../dto/sing-in.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { CreatePatientDto } from "../../patient/dto/create-patient.dto";
import { CreateStaffDto } from "../../staff/dto/create-staff.dto";

@Controller("auth")
export class USAuthController {
  constructor(private readonly authService: USAuthService) {}

  @Post("staff-sing-up")
  async singUpStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.authService.singUpStaff(createStaffDto);
  }

  @Post("staff-sing-in")
  async singInStaff(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInStaff(singInDto, res);
  }
  @Post("staff-sing-out")
  async StaffsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.StaffsinOut(refreshToke, res);
  }
  @Post("staff-refresh")
  async StaffrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.StaffrefreshToken(req, res);
  }

  // //-------------------------------------------------------------------------------------------------

  @Post("patient-sing-up")
  async singUpPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.singUpPatient(createPatientDto);
  }
  @Post("patient-sing-in")
  async singInPatient(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInPatient(singInDto, res);
  }
  @Post("patient-sing-out")
  async patientsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.patientsinOut(refreshToke, res);
  }
  @Post("patient-refresh")
  async PatientrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.PatientrefreshToken(req, res);
  }
}
