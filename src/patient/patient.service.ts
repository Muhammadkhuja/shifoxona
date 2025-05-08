import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient) private patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newpatient = await this.patientModel.create({
      ...createPatientDto,
      hashed_password,
    });
    try {
      await this.mailService.sendPatientMail(newpatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat jonatildi");
    }
    return newpatient;
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

  finByPatientEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  async UpdatePatientRefresh(id: number, refresh_token: string) {
    const update = await this.patientModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return update;
  }

    async activate(link: string) {
      if (!link) {
        throw new BadRequestException("Activation jonatilmadi !");
      }
  
      const update = await this.patientModel.update(
        { is_active: true },
        {
          where: {
            activate_link: link,
            is_active: false,
          },
          returning: true,
        }
      );
      if (!update[1][0]) {
        throw new BadRequestException("O'ta olma diz");
      }
  
      return {
        message: "Staff endi aktiv ",
        is_active: update[1][0].is_active,
      };
    }
}
