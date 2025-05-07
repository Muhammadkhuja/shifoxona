import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDateString, IsString } from "class-validator";

export class CreatePatientdiagnoDto {
  @IsNumber()
  @ApiProperty({
    example: 101,
    description: "Bemorning ID raqami",
    type: Number,
  })
  patientId: number;

  @IsNumber()
  @ApiProperty({
    example: 301,
    description: "Tashxis turi (diagnos) ID raqami",
    type: Number,
  })
  diagnosId: number;

  @IsNumber()
  @ApiProperty({
    example: 202,
    description: "Shifokorning ID raqami",
    type: Number,
  })
  doctorId: number;

  @IsDateString()
  @ApiProperty({
    example: "2025-05-07",
    description: "Tashxis qo'yilgan sana va vaqt",
    type: String,
  })
  diagnos_date: Date;

  @IsString()
  @ApiProperty({
    example: "Bemorda o'pka yallig'lanishi aniqlandi.",
    description: "Tashxis bo'yicha eslatma yoki qo'shimcha ma'lumot",
    type: String,
  })
  note: string;
}
