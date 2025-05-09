import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { SelfAdminGuard } from "../common/guards/selfadmin.guard";

@ApiTags("Admin-Administratorlar")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AuthGuard)
  // @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({ summary: "Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli yaratildi",
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 400, description: "Yaratuvchi xato", type: String })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // @UseGuards(AuthGuard)
  // @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: "Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar muvaffaqiyatli olindi",
    type: [CreateAdminDto],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AuthGuard)
  @UseGuards(SelfAdminGuard)
  @Get(":id")
  @ApiOperation({ summary: "Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli topildi",
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi", type: String })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Adminni taxrirlash" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli yangilandi",
    type: UpdateAdminDto,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi", type: String })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o'chirildi",
    type: String,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi", type: String })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Adminni faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli faollashtirildi",
    type: String,
  })
  @ApiResponse({ status: 404, description: "Link topilmadi", type: String })
  activate(@Param("link") link: string) {
    return this.adminService.activate(link);
  }
}
