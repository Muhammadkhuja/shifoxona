import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from "./admin/admin.module";
import { StaffModule } from "./staff/staff.module";
import { PatientModule } from "./patient/patient.module";
import { DoctorModule } from "./doctor/doctor.module";
import { PaymentModule } from "./payment/payment.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { PatientdiagnosModule } from "./patientdiagnos/patientdiagnos.module";
import { DiagnosModule } from "./diagnos/diagnos.module";
import { DiagnosmedisineModule } from "./diagnosmedisine/diagnosmedisine.module";
import { MedicationModule } from "./medication/medication.module";
import { Admin } from "./admin/models/admin.model";
import { Staff } from "./staff/models/staff.model";
import { Patient } from "./patient/models/patient.model";
import { Doctor } from "./doctor/models/doctor.model";
import { AuthModule } from "./auth/auth.module";
import { Appointment } from "./appointment/models/appointment.model";
import { PatientDiagnos } from "./patientdiagnos/models/patientdiagno.model";
import { Diagnos } from "./diagnos/models/diagno.model";
import { Payment } from "./payment/models/payment.model";
import { DiagnosMedisine } from "./diagnosmedisine/models/diagnosmedisine.model";
import { Medication } from "./medication/models/medication.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "static"),
    // }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PH_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [Admin, Staff, Patient, Doctor,Appointment, PatientDiagnos, Diagnos,Payment,DiagnosMedisine, Medication],
      autoLoadModels: true,
      sync: { alter: true },
      logging: true,
    }),

    AdminModule,
    StaffModule,
    PatientModule,
    DoctorModule,
    PaymentModule,
    AppointmentModule,
    PatientdiagnosModule,
    DiagnosModule,
    DiagnosmedisineModule,
    MedicationModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
