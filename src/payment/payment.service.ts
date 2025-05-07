import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll();
  }

  findOne(id: number): Promise<Payment | null> {
    return this.paymentModel.findByPk(id);
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment | null> {
    const updated = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "ochira olmading, keyinroq urinib kor.";
  }
}
