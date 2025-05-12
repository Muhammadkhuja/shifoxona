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
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { DoctorGuard } from "../common/guards/doctor.guard";
import { SelfDoctorGuard } from "../common/guards/selfdoctor.guard";

@ApiTags("Doctor - Shifokorlar")
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi shifokor qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Xatolik: noto'g'ri malumotlar kiritilgan",
  })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha shifokorlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Shifokorlar ro'yxati muvaffaqiyatli olindi",
  })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(":id")
  @UseGuards(SelfDoctorGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Shifokorni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Shifokor topildi" })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Shifokor ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Malumotlar muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Yangilash uchun shifokor topilmadi",
  })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Shifokorni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun shifokor topilmadi",
  })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Shifokorni aktivlashtirish havolasi orqali" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli aktivlashtirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Aktivlashtirish havolasi noto'g'ri yoki eskirgan",
  })
  activate(@Param("link") link: string) {
    return this.doctorService.activate(link);
  }
}
