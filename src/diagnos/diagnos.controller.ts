import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosService } from './diagnos.service';
import { CreateDiagnoDto } from './dto/create-diagno.dto';
import { UpdateDiagnoDto } from './dto/update-diagno.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Diagnos - Tashxislar')
@Controller('diagnos')
export class DiagnosController {
  constructor(private readonly diagnosService: DiagnosService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tashxis yaratish" })
  create(@Body() createDiagnoDto: CreateDiagnoDto) {
    return this.diagnosService.create(createDiagnoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha tashxislarni olish' })
  findAll() {
    return this.diagnosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Tashxisni ID orqali olish' })
  findOne(@Param('id') id: string) {
    return this.diagnosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Tashxis malumotlarini yangilash' })
  update(@Param('id') id: string, @Body() updateDiagnoDto: UpdateDiagnoDto) {
    return this.diagnosService.update(+id, updateDiagnoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Tashxisni o'chirish" })
  remove(@Param('id') id: string) {
    return this.diagnosService.remove(+id);
  }
}