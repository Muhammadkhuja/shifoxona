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
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SelfStaffGuard } from "../common/guards/selfstaff.guard";
import { StaffGuard } from "../common/guards/staff.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Staff - Hodimlar")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: "Yangi hodim qo'shish" })
  @ApiResponse({ status: 201, description: "Hodim muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik: noto'g'ri malumotlar" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }


  @Get()
  @ApiOperation({ summary: "Barcha hodimlarni olish" })
  @ApiResponse({ status: 200, description: "Hodimlar ro'yxati qaytarildi" })
  findAll() {
    return this.staffService.findAll();
  }

  @UseGuards(SelfStaffGuard)
  @UseGuards(StaffGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta hodimni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Topilgan hodim ma'lumoti" })
  @ApiResponse({ status: 404, description: "Hodim topilmadi" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Hodim ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Hodim yangilandi" })
  @ApiResponse({
    status: 404,
    description: "Yangilanish uchun hodim topilmadi",
  })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Hodimni o'chirish" })
  @ApiResponse({ status: 200, description: "Hodim o'chirildi" })
  @ApiResponse({ status: 404, description: "O'chirish uchun hodim topilmadi" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Hodimni aktivatsiya qilish" })
  @ApiResponse({
    status: 200,
    description: "Hodim muvaffaqiyatli aktivatsiya qilindi",
  })
  @ApiResponse({
    status: 400,
    description: "Aktivatsiya linki noto'g'ri yoki muddati o'tgan",
  })
  activateStaff(@Param("link") link: string) {
    return this.staffService.activateStaff(link);
  }
}
