import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Appointment - Qabul qilishlar")
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi qabul qo'shish" })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha qabul qilishlarni olish" })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Qabulni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Qabul malumotlarini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Qabulni ochirish" })
  remove(@Param("id") id: string) {
    return this.appointmentService.remove(+id);
  }
}
