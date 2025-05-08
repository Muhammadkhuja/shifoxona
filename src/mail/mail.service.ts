import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Doctor } from "../doctor/models/doctor.model";
import { Admin } from "../admin/models/admin.model";
import { Staff } from "../staff/models/staff.model";
import { Patient } from "../patient/models/patient.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendDoctorMail(doctor: Doctor) {
    const url = `${process.env.API_HOST}/api/doctor/activate/${doctor.activate_link}`;

    await this.mailerService.sendMail({
      to: doctor.email,
      subject: "Welcome to Shifoxona App!",
      template: "./confirmation",
      context: {
        name: doctor.full_name,
        url,
      },
    });
  }

  async sendAdminMail(admin: Admin) {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activate_link}`;

    await this.mailerService.sendMail({
      to: admin.email,
      subject: "Welcome to Shifoxona App!",
      template: "./confirmation",
      context: {
        name: admin.full_name,
        url,
      },
    });
  }

  async sendStaffMail(staff: Staff) {
    const url = `${process.env.API_HOST}/api/staff/activate/${staff.activate_link}`;

    await this.mailerService.sendMail({
      to: staff.email,
      subject: "Welcome to Shifoxona App!",
      template: "./confirmation",
      context: {
        name: staff.full_name,
        url,
      },
    });
  }

  async sendPatientMail(patient: Patient) {
    const url = `${process.env.API_HOST}/api/patient/activate/${patient.activate_link}`;

    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Welcome to Shifoxona App!",
      template: "./confirmation",
      context: {
        name: patient.full_name,
        url,
      },
    });
  }
}
