import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff) private staffModel: typeof Staff) {}

  async create(createStaffDto: CreateStaffDto) {
    const { password, confirm_password } = createStaffDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.staffModel.create({
      ...createStaffDto,
      hashed_password,
    });
  }

  findAll(): Promise<Staff[]> {
    return this.staffModel.findAll();
  }

  findOne(id: number): Promise<Staff | null> {
    return this.staffModel.findByPk(id);
  }

  async update(
    id: number,
    updateStaffDto: UpdateStaffDto
  ): Promise<Staff | null> {
    const updated = await this.staffModel.update(updateStaffDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.staffModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chira olmading, keyinroq urinib ko'r.";
  }
}
