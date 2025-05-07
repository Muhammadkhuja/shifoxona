import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationService } from "./medication.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Medication - Dori-darmonlar")
@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @ApiOperation({ summary: "Yangi dori-darmon qo'shish" })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha dori-darmonlarni olish" })
  findAll() {
    return this.medicationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Dori-darmonni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.medicationService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Dori-darmon ma'lumotlarini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Dori-darmonni o'chirish" })
  remove(@Param("id") id: string) {
    return this.medicationService.remove(+id);
  }
}
