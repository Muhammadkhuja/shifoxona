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
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { PatientDiagnosService } from "./patientdiagnos.service";

@ApiTags("PatientDiagnos - Bemor tashxislari")
@Controller("patientdiagnos")
export class PatientdiagnosController {
  constructor(private readonly patientdiagnosService: PatientDiagnosService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tashxis qo'shish" })
  create(@Body() createPatientdiagnoDto: CreatePatientdiagnoDto) {
    return this.patientdiagnosService.create(createPatientdiagnoDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemor tashxislarini olish" })
  findAll() {
    return this.patientdiagnosService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Tashxisni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.patientdiagnosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tashxis ma'lumotlarini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updatePatientdiagnoDto: UpdatePatientdiagnoDto
  ) {
    return this.patientdiagnosService.update(+id, updatePatientdiagnoDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tashxisni o'chirish" })
  remove(@Param("id") id: string) {
    return this.patientdiagnosService.remove(+id);
  }
}
