import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @ApiProperty({
    example: "Kimdur Palonchiyev",
    description: "To'liq ism familiya",
    type: String,
  })
  full_name: string;

  @IsString()
  @ApiProperty({
    example: "Dasturchi",
    description: "Mutaxassislik",
    type: String,
  })
  specialization: string;

  @IsPhoneNumber("UZ")
  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami",
    type: String,
  })
  phone: string;

  @IsEmail()
  @ApiProperty({
    example: "kimdur@mail.com",
    description: "Email manzili",
    type: String,
  })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
  @ApiProperty({
    example: "admin123",
    description: "Parol (kamida 6 ta belgi)",
    type: String,
  })
  password: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
  @ApiProperty({
    example: "admin123",
    description: "Parolni tasdiqlash (password bilan bir xil bo'lishi kerak)",
    type: String,
  })
  confirm_password: string;
}
