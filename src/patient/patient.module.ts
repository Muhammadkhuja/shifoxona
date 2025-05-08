import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService, MailService],
  exports: [PatientService],
})
export class PatientModule {}
