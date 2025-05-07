import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, confirm_password } = createDoctorDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.doctorModel.create({
      ...createDoctorDto,
      hashed_password,
    });
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorModel.findAll();
  }

  findOne(id: number): Promise<Doctor | null> {
    return this.doctorModel.findByPk(id);
  }

  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto
  ): Promise<Doctor | null> {
    const updated = await this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.doctorModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chira olmading, keyinroq urinib ko'r.";
  }
}
