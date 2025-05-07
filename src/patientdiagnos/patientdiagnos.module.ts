import { Module } from '@nestjs/common';
import { PatientdiagnosController } from './patientdiagnos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientDiagnos } from './models/patientdiagno.model';
import { PatientDiagnosService } from './patientdiagnos.service';

@Module({
  imports: [SequelizeModule.forFeature([PatientDiagnos])],
  controllers: [PatientdiagnosController],
  providers: [PatientDiagnosService],
})
export class PatientdiagnosModule {}
