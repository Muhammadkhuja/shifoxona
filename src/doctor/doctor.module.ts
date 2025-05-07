import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
