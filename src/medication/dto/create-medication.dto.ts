import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumberString } from "class-validator";

export class CreateMedicationDto {
  @IsString()
  @ApiProperty({
    example: "Paracetamol",
    description: "Dori nomi",
    type: String,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: "Og'riqni kamaytirish va yallig'lanishni pasaytirish",
    description: "Dorining tavsifi",
    type: String,
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: "500mg",
    description: "Dorining dozasi",
    type: String,
  })
  dosage: string;

  @IsString()
  @ApiProperty({
    example: "ABC Farm",
    description: "Dori ishlab chiqaruvchi firma",
    type: String,
  })
  manufacturer: string;

  @IsNumberString()
  @ApiProperty({
    example: "10000",
    description: "Dorining narxi",
    type: String,
  })
  price: string;
}
