import { PartialType } from '@nestjs/swagger';
import { CreatePatientdiagnoDto } from './create-patientdiagno.dto';

export class UpdatePatientdiagnoDto extends PartialType(CreatePatientdiagnoDto) {}
