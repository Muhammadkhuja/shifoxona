import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Payment - Tolovlar")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tolov qo'shish" })
  @ApiResponse({ status: 201, description: "Tolov muvaffaqiyatli yaratildi" })
  @ApiResponse({
    status: 400,
    description: "Xatolik: noto'g'ri malumotlar kiritildi",
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tolovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tolovlar ro'yxati muvaffaqiyatli qaytarildi",
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Tolovni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Tolov topildi va qaytarildi" })
  @ApiResponse({ status: 404, description: "Tolov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tolov ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Tolov malumotlari yangilandi" })
  @ApiResponse({
    status: 404,
    description: "Yangilanish uchun tolov topilmadi",
  })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tolovni o'chirish" })
  @ApiResponse({ status: 200, description: "Tolov muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "O'chirish uchun tolov topilmadi" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
