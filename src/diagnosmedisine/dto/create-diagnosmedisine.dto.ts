import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateDiagnosmedisineDto {
  @IsNumber()
  @ApiProperty({
    example: 301,
    description: "Tashxis ID raqami",
    type: Number,
  })
  diagnosId: number;

  @IsNumber()
  @ApiProperty({
    example: 501,
    description: "Dori ID raqami",
    type: Number,
  })
  medisineId: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: "Dori standart (true - standart, false - maxsus)",
    type: Boolean,
  })
  is_standart: boolean;
}
