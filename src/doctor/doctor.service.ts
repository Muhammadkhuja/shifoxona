import { BadGatewayException, BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor,
private readonly mailService: MailService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, confirm_password } = createDoctorDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newdoctor = await this.doctorModel.create({
      ...createDoctorDto,
      hashed_password,
    });
        try {
          await this.mailService.sendDoctorMail(newdoctor);
        } catch (error) {
          console.log(error);
          throw new ServiceUnavailableException("Emailga xat jonatildi");
        }
        return newdoctor;
      
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

  finByDoctorEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  async UpdateDoctorRefresh(id: number, refresh_token: string) {
    const update = await this.doctorModel.update(
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
  
      const update = await this.doctorModel.update(
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
        message: "doctor endi aktiv",
        is_active: update[1][0].is_active,
      };
    }
}
