import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { PaymentModule } from './payment/payment.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientdiagnosModule } from './patientdiagnos/patientdiagnos.module';
import { DiagnosModule } from './diagnos/diagnos.module';
import { DiagnosmedisineModule } from './diagnosmedisine/diagnosmedisine.module';
import { MedicationModule } from './medication/medication.module';

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
      models: [],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
