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
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Patient - Bemorlar")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  findAll() {
    return this.patientService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bemorni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemor ma'lumotlarini yangilash" })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemorni o'chirish" })
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }
}
