import { PartialType } from '@nestjs/swagger';
import { CreateDiagnoDto } from './create-diagno.dto';

export class UpdateDiagnoDto extends PartialType(CreateDiagnoDto) {}
