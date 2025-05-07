import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateStaffDto {
  @IsString()
  @ApiProperty({
    example: "Kimdur Palonchiyev",
    description: "To'liq ism familiya",
    type: String,
  })
  full_name: string;

  @IsString()
  @ApiProperty({
    example: "Direktor",
    description: "Lavozimi",
    type: String,
  })
  position: string;

  @IsPhoneNumber("UZ")
  @ApiProperty({
    example: "+998991234567",
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

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
  @ApiProperty({
    example: "admin123",
    description: "Foydalanuvchining tasdiqlash paroli",
    type: String,
  })
  confirm_password: string;

  @IsString()
  @ApiProperty({
    example: 5000000,
    description: "Maosh summasi so'mda",
    type: Number,
  })
  salary: number;
}
