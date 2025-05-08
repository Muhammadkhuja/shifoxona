import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff) private staffModel: typeof Staff,
    private readonly mailService: MailService
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const { password, confirm_password } = createStaffDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newStaff = await this.staffModel.create({
      ...createStaffDto,
      hashed_password,
    });
    try {
      await this.mailService.sendStaffMail(newStaff);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat jonatildi");
    }
    return newStaff;
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

  finByStaffEmail(email: string) {
    return this.staffModel.findOne({ where: { email } });
  }

  async UpdateStaffRefresh(id: number, refresh_token: string) {
    const update = await this.staffModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return update;
  }

  async activateStaff(link: string) {
    if (!link) {
      throw new BadRequestException("Activation jonatilmadi !");
    }

    const update = await this.staffModel.update(
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
