import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Doctor - Shifokorlar")
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: "Yangi shifokor qo'shish" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha shifokorlarni olish" })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Shifokorni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Shifokor ma'lumotlarini yangilash" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Shifokorni o'chirish" })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }
}
