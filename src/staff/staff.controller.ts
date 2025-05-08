import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Staff - Hodimlar")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: "Yangi hodim qo'shish" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha hodimlarni olish" })
  findAll() {
    return this.staffService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta hodimni ID orqali olish" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Hodim malumotlarini yangilash" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Hodimni o'chirish" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }

  @Get("activate/:link")
  activateStaff(@Param("link") link: string) {
    return this.staffService.activateStaff(link);
  }
}
