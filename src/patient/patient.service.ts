import { BadGatewayException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient) private patientModel: typeof Patient) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.patientModel.create({
      ...createPatientDto,
      hashed_password,
    });
  }

  findAll(): Promise<Patient[]> {
    return this.patientModel.findAll();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientModel.findByPk(id);
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto
  ): Promise<Patient | null> {
    const updated = await this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.patientModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chira olmading, keyinroq urinib ko'r.";
  }
}
