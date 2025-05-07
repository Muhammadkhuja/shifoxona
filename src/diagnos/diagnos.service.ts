import { Injectable } from '@nestjs/common';
import { CreateDiagnoDto } from './dto/create-diagno.dto';
import { UpdateDiagnoDto } from './dto/update-diagno.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnos } from './models/diagno.model';

@Injectable()
export class DiagnosService {
  constructor(@InjectModel(Diagnos) private diagnosModel: typeof Diagnos) {}

  create(createDiagnosDto: CreateDiagnoDto) {
    return this.diagnosModel.create(createDiagnosDto);
  }

  findAll(): Promise<Diagnos[]> {
    return this.diagnosModel.findAll();
  }

  findOne(id: number): Promise<Diagnos | null> {
    return this.diagnosModel.findByPk(id);
  }

  async update(
    id: number,
    updateDiagnosDto: UpdateDiagnoDto
  ): Promise<Diagnos | null> {
    const updated = await this.diagnosModel.update(updateDiagnosDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.diagnosModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chirishni iloji bo'lmadi.";
  }
}

