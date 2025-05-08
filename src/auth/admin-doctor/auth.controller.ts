
import { Request, Response } from "express";
import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ADAuthService } from "./auth.service";
import { SingInDto } from "../dto/sing-in.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class ADAuthController {
  constructor(private readonly authService: ADAuthService) {}

  @Post("admin-sing-in")
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }
  @Post("admin-sing-out")
  async adminsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminsinOut(refreshToke, res);
  }
  @Post("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Post("doctor-sing-in")
  async singInDoctor(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInDoctor(singInDto, res);
  }
  @Post("doctor-sing-out")
  async DoctorsinOut(
    @CookieGetter("refresh_token") refreshToke: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.DoctorsinOut(refreshToke, res);
  }
  @Post("doctor-refresh")
  async DoctorrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.DoctorrefreshToken(req, res);
  }
}
