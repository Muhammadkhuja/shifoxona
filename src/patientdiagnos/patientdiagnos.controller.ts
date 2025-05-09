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
import { CreatePatientdiagnoDto } from "./dto/create-patientdiagno.dto";
import { UpdatePatientdiagnoDto } from "./dto/update-patientdiagno.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PatientDiagnosService } from "./patientdiagnos.service";
import { DoctorGuard } from "../common/guards/doctor.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { JwtRolesGuard } from "../common/guards/roles.guard";
import { SelfPatientGuard } from "../common/guards/selfpatient.guard";
import { PatientGuard } from "../common/guards/patient.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("PatientDiagnos - Bemor tashxislari")
@Controller("patientdiagnos")
export class PatientdiagnosController {
  constructor(private readonly patientdiagnosService: PatientDiagnosService) {}

  @Post()
  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
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
  @Roles("admin", "doctor", "staff")
  @UseGuards(JwtRolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha bemor tashxislarini olish" })
  @ApiResponse({
    status: 200,
    description: "Tashxislar ro'yxati muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.patientdiagnosService.findAll();
  }

  @Get(":id")
  @UseGuards(SelfPatientGuard)
  @UseGuards(PatientGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxisni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Tashxis topildi" })
  @ApiResponse({ status: 404, description: "Tashxis topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientdiagnosService.findOne(+id);
  }

  @Patch(":id")
  @Roles("admin", "doctor")
  @UseGuards(JwtRolesGuard)
  @UseGuards(AuthGuard)
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
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
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
