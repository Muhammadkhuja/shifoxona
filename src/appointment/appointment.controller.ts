import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { JwtRolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { SelfPatientGuard } from "../common/guards/selfpatient.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Appointment - Qabul qilishlar")
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard)
  @UseGuards(JwtRolesGuard)
  @Roles("doctor", "patient", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi qabul qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Qabul muvaffaqiyatli yaratildi",
    type: CreateAppointmentDto,
  })
  @ApiResponse({ status: 400, description: "Yaratuvchi xato", type: String })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(JwtRolesGuard)
  @Roles("doctor", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha qabul qilishlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha qabul olishlar muvaffaqiyatli olish",
    type: [CreateAppointmentDto],
  })
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @UseGuards(SelfPatientGuard)
  @Get(":id")
  @ApiOperation({ summary: "Qabulni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Qabul muvaffaqiyatli topildi",
    type: CreateAppointmentDto,
  })
  @ApiResponse({ status: 404, description: "Qabul topilmadi", type: String })
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Qabul malumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Qabul muvaffaqiyatli yangilandi",
    type: UpdateAppointmentDto,
  })
  @ApiResponse({ status: 404, description: "Qabul topilmadi", type: String })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Qabulni ochirish" })
  @ApiResponse({
    status: 200,
    description: "Qabul muvaffaqiyatli o'chirildi",
    type: String,
  })
  @ApiResponse({ status: 404, description: "Qabul topilmadi", type: String })
  remove(@Param("id") id: string) {
    return this.appointmentService.remove(+id);
  }
}
