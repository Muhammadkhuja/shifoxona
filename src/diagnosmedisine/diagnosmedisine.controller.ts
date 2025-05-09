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
import { CreateDiagnosmedisineDto } from "./dto/create-diagnosmedisine.dto";
import { UpdateDiagnosmedisineDto } from "./dto/update-diagnosmedisine.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DiagnosMedisineService } from "./diagnosmedisine.service";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("DiagnosMedisine - Tashxis va dori-darmonlar")
@Controller("diagnosmedisine")
export class DiagnosmedisineController {
  constructor(
    private readonly diagnosmedisineService: DiagnosMedisineService
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi tashxis va dori-darmon qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Tashxis va dori-darmon muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar kiritilgan" })
  create(@Body() createDiagnosmedisineDto: CreateDiagnosmedisineDto) {
    return this.diagnosmedisineService.create(createDiagnosmedisineDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha tashxis va dori-darmonlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tashxis va dori-darmonlar ro'yxati olindi",
  })
  findAll() {
    return this.diagnosmedisineService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxis va dori-darmonni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Tashxis va dori-darmon topildi" })
  @ApiResponse({ status: 404, description: "Tashxis va dori-darmon topilmadi" })
  findOne(@Param("id") id: string) {
    return this.diagnosmedisineService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxis va dori-darmon ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilash muvaffaqiyatli bajarildi",
  })
  @ApiResponse({
    status: 404,
    description: "Yangilash uchun ma'lumot topilmadi",
  })
  update(
    @Param("id") id: string,
    @Body() updateDiagnosmedisineDto: UpdateDiagnosmedisineDto
  ) {
    return this.diagnosmedisineService.update(+id, updateDiagnosmedisineDto);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Tashxis va dori-darmonlarni o'chirish" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli o'chirildi" })
  @ApiResponse({
    status: 404,
    description: "O'chirish uchun malumot topilmadi",
  })
  remove(@Param("id") id: string) {
    return this.diagnosmedisineService.remove(+id);
  }
}
