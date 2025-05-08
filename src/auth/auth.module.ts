import { Module } from "@nestjs/common";
import { USAuthService } from "./user-staff/auth.service";
import { USAuthController } from "./user-staff/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PatientModule } from "../patient/patient.module";
import { StaffModule } from "../staff/staff.module";
import { ADAuthController } from "./admin-doctor/auth.controller";
import { ADAuthService } from "./admin-doctor/auth.service";
import { DoctorModule } from "../doctor/doctor.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [JwtModule.register({ global: true }), PatientModule, StaffModule, DoctorModule, AdminModule],
  controllers: [ADAuthController, USAuthController],
  providers: [ADAuthService, USAuthService],
})
export class AuthModule {}
