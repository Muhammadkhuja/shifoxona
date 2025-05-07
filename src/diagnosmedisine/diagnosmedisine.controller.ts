import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateDiagnosmedisineDto } from "./dto/create-diagnosmedisine.dto";
import { UpdateDiagnosmedisineDto } from "./dto/update-diagnosmedisine.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DiagnosMedisineService } from "./diagnosmedisine.service";

@ApiTags("DiagnosMedisine - Tashxis va dori-darmonlar")
@Controller("diagnosmedisine")
export class DiagnosmedisineController {
  constructor(
    private readonly diagnosmedisineService: DiagnosMedisineService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi tashxis va dori-darmon qo'shish" })
  create(@Body() createDiagnosmedisineDto: CreateDiagnosmedisineDto) {
    return this.diagnosmedisineService.create(createDiagnosmedisineDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tashxis va dori-darmonlarni olish" })
  findAll() {
    return this.diagnosmedisineService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Tashxis va dori-darmonni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.diagnosmedisineService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tashxis va dori-darmon ma'lumotlarini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateDiagnosmedisineDto: UpdateDiagnosmedisineDto
  ) {
    return this.diagnosmedisineService.update(+id, updateDiagnosmedisineDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tashxis va dori-darmonlarni o'chirish" })
  remove(@Param("id") id: string) {
    return this.diagnosmedisineService.remove(+id);
  }
}
