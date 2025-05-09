import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateDiagnoDto {
  @IsString()
  @ApiProperty({
    example: "J20",
    description: "Tashxis kodi (ICD-10 yoki boshqa formatda)",
    type: String,
  })
  diagnos_code: string;

  @IsString()
  @ApiProperty({
    example: "Bronxit",
    description: "Tashxis nomi",
    type: String,
  })
  diagnos: string;

  @IsString()
  @ApiProperty({
    example: "Yuqori nafas yo'llarining yallig'lanishi",
    description: "Tashxisga qisqacha tavsif",
    type: String,
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "Ushbu tashxisni yaratgan foydalanuvchi ID raqami",
    type: Number,
  })
  createdId: number;
}
