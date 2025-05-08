import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly mailService: MailService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Paroller mos emas ");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    try {
      await this.mailService.sendAdminMail(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat jonatildi");
    }
    return newAdmin;
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
    return "o'chira olmading, yana urinib ko'r.";
  }

  finByAdminEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async UpdateAdminRefresh(id: number, refresh_token: string) {
    const updateAdmin = await this.adminModel.update(
      { refresh_token },
      {
        where: { id },
      }
    );
    return updateAdmin;
  }

    async activate(link: string) {
      if (!link) {
        throw new BadRequestException("Activation jonatilmadi !");
      }
  
      const update = await this.adminModel.update(
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
