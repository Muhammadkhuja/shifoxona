import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

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

//   @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT })
  declare patientId: number;

//   @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare doctorId: number;

  @Column({ type: DataType.DATE })
  declare appointment_date: Date;

  @Column({ type: DataType.STRING })
  declare note: string;

  @Column({ type: DataType.STRING })
  declare status: string;
}
