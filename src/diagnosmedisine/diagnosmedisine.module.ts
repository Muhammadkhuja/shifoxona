import { Module } from '@nestjs/common';
import { DiagnosmedisineController } from './diagnosmedisine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiagnosMedisine } from './models/diagnosmedisine.model';
import { DiagnosMedisineService } from './diagnosmedisine.service';

@Module({
  imports: [SequelizeModule.forFeature([DiagnosMedisine])],
  controllers: [DiagnosmedisineController],
  providers: [DiagnosMedisineService],
})
export class DiagnosmedisineModule {}
