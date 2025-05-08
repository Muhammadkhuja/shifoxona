import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Patient - Bemorlar")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli yaratildi" })
  @ApiResponse({
    status: 400,
    description: "Xatolik: noto'g'ri malumotlar kiritildi",
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Bemorlar ro'yxati muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.patientService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bemorni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Bemor topildi va qaytarildi" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemor ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Bemor malumotlari yangilandi" })
  @ApiResponse({ status: 404, description: "Yangilash uchun bemor topilmadi" })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemorni o'chirish" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "O'chirish uchun bemor topilmadi" })
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Bemor profilini faollashtirish" })
  @ApiResponse({
    status: 200,
    description: "Faollashtirish muvaffaqiyatli yakunlandi",
  })
  @ApiResponse({
    status: 400,
    description: "Faollashtirish linki yaroqsiz yoki muddati tugagan",
  })
  activate(@Param("link") link: string) {
    return this.patientService.activate(link);
  }
}
