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
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Payment - Tolovlar")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi tolov qo'shish" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tolovlarni olish" })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Tolovni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tolov malumotlarini yangilash" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tolovni ochirish" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
