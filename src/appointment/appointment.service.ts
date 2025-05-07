import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentModel.create(createAppointmentDto);
  }

  findAll(): Promise<Appointment[]> {
    return this.appointmentModel.findAll();
  }

  findOne(id: number): Promise<Appointment | null> {
    return this.appointmentModel.findByPk(id);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment | null> {
    const updated = await this.appointmentModel.update(updateAppointmentDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.appointmentModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yoq";
    }
    return "ochira olmading, keyinroq urinib kor.";
  }
}
