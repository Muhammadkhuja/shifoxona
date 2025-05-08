import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreatePatientdiagnoDto } from "./dto/create-patientdiagno.dto";
import { UpdatePatientdiagnoDto } from "./dto/update-patientdiagno.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PatientDiagnosService } from "./patientdiagnos.service";

@ApiTags("PatientDiagnos - Bemor tashxislari")
@Controller("patientdiagnos")
export class PatientdiagnosController {
  constructor(private readonly patientdiagnosService: PatientDiagnosService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tashxis qo'shish" })
  @ApiResponse({ status: 201, description: "Tashxis muvaffaqiyatli yaratildi" })
  @ApiResponse({
    status: 400,
    description: "Xatolik: noto'g'ri malumotlar kiritilgan",
  })
  create(@Body() createPatientdiagnoDto: CreatePatientdiagnoDto) {
    return this.patientdiagnosService.create(createPatientdiagnoDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemor tashxislarini olish" })
  @ApiResponse({
    status: 200,
    description: "Tashxislar ro'yxati muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.patientdiagnosService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Tashxisni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Tashxis topildi" })
  @ApiResponse({ status: 404, description: "Tashxis topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientdiagnosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tashxis ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Tashxis malumotlari yangilandi" })
  @ApiResponse({
    status: 404,
    description: "Yangilash uchun tashxis topilmadi",
  })
  update(
    @Param("id") id: string,
    @Body() updatePatientdiagnoDto: UpdatePatientdiagnoDto
  ) {
    return this.patientdiagnosService.update(+id, updatePatientdiagnoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tashxisni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Tashxis muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun tashxis topilmadi",
  })
  remove(@Param("id") id: string) {
    return this.patientdiagnosService.remove(+id);
  }
}
