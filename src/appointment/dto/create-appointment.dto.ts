import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDateString, IsNotEmpty } from "class-validator";

export class CreateAppointmentDto {
  @IsNumber()
  @ApiProperty({
    example: 101,
    description: "Bemor ID raqami",
    type: Number,
  })
  patientId: number;

  @IsNumber()
  @ApiProperty({
    example: 202,
    description: "Shifokor ID raqami",
    type: Number,
  })
  doctorId: number;

  @IsDateString()
  @ApiProperty({
    example: "2025-05-07",
    description: "Uchrashuv sanasi va vaqti",
    type: String,
  })
  appointment_date: Date;

  @IsString()
  @ApiProperty({
    example: "Bemorni tekshirish va davolash uchun tayinlangan uchrashuv.",
    description: "Uchrashuv haqida eslatma",
    type: String,
  })
  note: string;

  @IsString()
  @ApiProperty({
    example: "Kutish",
    description:
      "Uchrashuvning hozirgi holati (masalan: kutish, o'tkazildi, bekor qilingan)",
    type: String,
  })
  status: string;
}
