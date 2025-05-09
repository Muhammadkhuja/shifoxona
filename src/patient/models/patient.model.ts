import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { PatientDiagnos } from "../../patientdiagnos/models/patientdiagno.model";

export interface IPatientCreateAttr {
  full_name: string;
  birth: Date;
  gender: boolean;
  phone: string;
  email: string;
  hashed_password: string;
  address: string;
  pasport: string;
  created_at: Date;
}

@Table({ tableName: "patient", timestamps: false })
export class Patient extends Model<Patient, IPatientCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.DATE })
  declare birth: Date;

  @Column({ type: DataType.BOOLEAN })
  declare gender: boolean;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @Column({ type: DataType.STRING })
  declare address: string;

  @Column({ type: DataType.STRING })
  declare pasport: string;

  @Column({ type: DataType.DATE })
  declare created_at: Date;

  @Column({ type: DataType.STRING })
  declare refresh_token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4() })
  declare activate_link: string;

  @HasMany(() => Appointment)
  appointment: Appointment[];

  @HasMany(() => PatientDiagnos)
  patientdiagnos: PatientDiagnos;
}
