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
import { DiagnosService } from "./diagnos.service";
import { CreateDiagnoDto } from "./dto/create-diagno.dto";
import { UpdateDiagnoDto } from "./dto/update-diagno.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DoctorGuard } from "../common/guards/doctor.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { JwtRolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { PatientGuard } from "../common/guards/patient.guard";
import { SelfPatientGuard } from "../common/guards/selfpatient.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Diagnos - Tashxislar")
@Controller("diagnos")
export class DiagnosController {
  constructor(private readonly diagnosService: DiagnosService) {}

  @Post()
  @Roles("patient", "doctor")
  @UseGuards(JwtRolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi tashxis yaratish" })
  @ApiResponse({ status: 201, description: "Tashxis muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Yaratishda xatolik yuz berdi" })
  create(@Body() createDiagnoDto: CreateDiagnoDto) {
    return this.diagnosService.create(createDiagnoDto);
  }

  @Get()
  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha tashxislarni olish" })
  @ApiResponse({ status: 200, description: "Tashxislar ro'yxati olindi" })
  findAll() {
    return this.diagnosService.findAll();
  }

  @Get(":id")
  @UseGuards(SelfPatientGuard)
  @UseGuards(PatientGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxisni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Tashxis topildi" })
  @ApiResponse({ status: 404, description: "Tashxis topilmadi" })
  findOne(@Param("id") id: string) {
    return this.diagnosService.findOne(+id);
  }

  @Patch(":id")
  @Roles("admin", "doctor")
  @UseGuards(JwtRolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxis malumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Tashxis yangilandi" })
  @ApiResponse({
    status: 404,
    description: "Yangilanish uchun tashxis topilmadi",
  })
  update(@Param("id") id: string, @Body() updateDiagnoDto: UpdateDiagnoDto) {
    return this.diagnosService.update(+id, updateDiagnoDto);
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
    return this.diagnosService.remove(+id);
  }
}
