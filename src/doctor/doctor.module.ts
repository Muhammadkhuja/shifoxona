import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService, MailService],
  exports: [DoctorService]
})
export class DoctorModule {}
