import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { CreateAdminDto } from "./dto/create-admin.dto";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
  }
  findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  findOne(id: number): Promise<Admin | null> {
    return this.adminModel.findByPk(id);
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto
  ): Promise<Admin | null> {
    const updated = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.adminModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o‘chira olmading, yana urinib ko‘r.";
  }
}
