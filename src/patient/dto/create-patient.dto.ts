import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsDateString,
  IsBoolean,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

export class CreatePatientDto {
  @IsString()
  @ApiProperty({
    example: "Kimdur Palonchiyev",
    description: "To'liq ism familiya",
    type: String,
  })
  full_name: string;

  @IsDateString()
  @ApiProperty({
    example: "1990-05-07",
    description: "Tug'ilgan sana",
    type: String,
  })
  birth: Date;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: "Jinsi (true - erkak, false - ayol)",
    type: Boolean,
  })
  gender: boolean;

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
    description: "Foydalanuvchining email manzili",
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
    description: "Foydalanuvchining paroli",
    type: String,
  })
  password: string;

  @ApiProperty({
    example: "admin123",
    description: "Foydalanuvchining paroli",
    type: String,
  })
  confirm_password: string;

  @IsString()
  @ApiProperty({
    example: "Toshkent sh., Mirzo Ulug'bek tumani",
    description: "Foydalanuvchining yashash manzili",
    type: String,
  })
  address: string;

  @IsString()
  @ApiProperty({
    example: "AB1234567",
    description: "Foydalanuvchining pasport raqami",
    type: String,
  })
  pasport: string;

  @IsDateString()
  @ApiProperty({
    example: "2025-05-07",
    description: "Yaratilgan sana",
    type: String,
  })
  created_at: Date;
}
