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
import { MedicationService } from "./medication.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Medication - Dori-darmonlar")
@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi dori-darmon qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Dori-darmon muvaffaqiyatli yaratildi",
  })
  @ApiResponse({
    status: 400,
    description: "Xatolik: noto'g'ri malumotlar kiritilgan",
  })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha dori-darmonlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Dori-darmonlar ro'yxati muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.medicationService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Dori-darmonni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Dori-darmon topildi va qaytarildi",
  })
  @ApiResponse({ status: 404, description: "Dori-darmon topilmadi" })
  findOne(@Param("id") id: string) {
    return this.medicationService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Dori-darmon ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Dori-darmon malumotlari yangilandi",
  })
  @ApiResponse({
    status: 404,
    description: "Yangilash uchun dori-darmon topilmadi",
  })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Dori-darmonni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Dori-darmon muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun dori-darmon topilmadi",
  })
  remove(@Param("id") id: string) {
    return this.medicationService.remove(+id);
  }
}
