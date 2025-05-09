import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Appointment } from "../../appointment/models/appointment.model";
import { PatientDiagnos } from "../../patientdiagnos/models/patientdiagno.model";
import { Diagnos } from "../../diagnos/models/diagno.model";

export interface IDoctorCreateAttr {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: "doctor", timestamps: false })
export class Doctor extends Model<Doctor, IDoctorCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING })
  declare specialization: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare hashed_password: string;

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

  @HasMany(() => Diagnos)
  diagnos: Diagnos;
}
