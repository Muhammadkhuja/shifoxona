import { Injectable } from '@nestjs/common';
import { DiagnosMedisine } from './models/diagnosmedisine.model';
import { CreateDiagnosmedisineDto } from './dto/create-diagnosmedisine.dto';
import { UpdateDiagnosmedisineDto } from './dto/update-diagnosmedisine.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DiagnosMedisineService {
  constructor(
    @InjectModel(DiagnosMedisine)
    private diagnosMedisineModel: typeof DiagnosMedisine
  ) {}

  create(createDiagnosMedisineDto: CreateDiagnosmedisineDto) {
    return this.diagnosMedisineModel.create(createDiagnosMedisineDto);
  }

  findAll(): Promise<DiagnosMedisine[]> {
    return this.diagnosMedisineModel.findAll();
  }

  findOne(id: number): Promise<DiagnosMedisine | null> {
    return this.diagnosMedisineModel.findByPk(id);
  }

  async update(
    id: number,
    updateDiagnosMedisineDto: UpdateDiagnosmedisineDto
  ): Promise<DiagnosMedisine | null> {
    const updated = await this.diagnosMedisineModel.update(
      updateDiagnosMedisineDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.diagnosMedisineModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chirishni iloji bo'lmadi.";
  }
}
