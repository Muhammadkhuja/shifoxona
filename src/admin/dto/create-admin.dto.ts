import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "Kim",
    description: "Foydalanuvchining to'liq ism familiyasi",
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: "kim@mail.com",
    description: "Foydalanuvchining email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password",
    description: "Foydalanuvchining paro'li",
  })
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
  password: string;

  @ApiProperty({
    example: "password",
    description: "Foydalanuvchining tasdiqlangan paro'li",
  })
  confirm_password: string;
}
