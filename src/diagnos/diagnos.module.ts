import { Module } from '@nestjs/common';
import { DiagnosService } from './diagnos.service';
import { DiagnosController } from './diagnos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Diagnos } from './models/diagno.model';

@Module({
  imports: [SequelizeModule.forFeature([Diagnos])],
  controllers: [DiagnosController],
  providers: [DiagnosService],
})
export class DiagnosModule {}
