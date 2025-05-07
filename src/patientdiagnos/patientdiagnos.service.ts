import { Injectable } from '@nestjs/common';
import { CreatePatientdiagnoDto } from './dto/create-patientdiagno.dto';
import { UpdatePatientdiagnoDto } from './dto/update-patientdiagno.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PatientDiagnos } from './models/patientdiagno.model';

@Injectable()
export class PatientDiagnosService {
  constructor(
    @InjectModel(PatientDiagnos)
    private patientDiagnosModel: typeof PatientDiagnos
  ) {}

  create(createPatientDiagnosDto: CreatePatientdiagnoDto) {
    return this.patientDiagnosModel.create(createPatientDiagnosDto);
  }

  findAll(): Promise<PatientDiagnos[]> {
    return this.patientDiagnosModel.findAll();
  }

  findOne(id: number): Promise<PatientDiagnos | null> {
    return this.patientDiagnosModel.findByPk(id);
  }

  async update(
    id: number,
    updatePatientDiagnosDto: UpdatePatientdiagnoDto
  ): Promise<PatientDiagnos | null> {
    const updated = await this.patientDiagnosModel.update(
      updatePatientDiagnosDto,
      {
        where: { id },
        returning: true,
      }
    );
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.patientDiagnosModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chira olmading, keyinroq urinib ko'r.";
  }
}

