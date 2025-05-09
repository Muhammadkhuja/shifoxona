import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Payment } from "../../payment/models/payment.model";
import { Patient } from "../../patient/models/patient.model";
import { Doctor } from "../../doctor/models/doctor.model";

export interface IAppointmentCreateAttr {
  patientId: number;
  doctorId: number;
  appointment_date: Date;
  note: string;
  status: string;
}

@Table({ tableName: "appointment" })
export class Appointment extends Model<Appointment, IAppointmentCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT })
  declare patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @Column({ type: DataType.DATE })
  declare appointment_date: Date;

  @Column({ type: DataType.STRING })
  declare note: string;

  @Column({ type: DataType.STRING })
  declare status: string;

  @HasMany(() => Payment)
  payment: Payment[];
}
