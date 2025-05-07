import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString } from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
  @ApiProperty({
    example: 12,
    description: "Uchrashuv ID raqami",
    type: Number,
  })
  appointmentId: number;

  @IsNumber()
  @ApiProperty({
    example: 150000,
    description: "To'lov summasi",
    type: Number,
  })
  amount: number;

  @IsString()
  @ApiProperty({
    example: "Naqd",
    description: "To'lov usuli (masalan: Naqd, Click, Payme)",
    type: String,
  })
  payment_method: string;

  @IsDateString()
  @ApiProperty({
    example: "2025-05-07",
    description: "To'lov qilingan sana va vaqt",
    type: String,
  })
  payment_at: Date;
}
