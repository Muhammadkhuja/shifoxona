import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosmedisineDto } from './create-diagnosmedisine.dto';

export class UpdateDiagnosmedisineDto extends PartialType(CreateDiagnosmedisineDto) {}
