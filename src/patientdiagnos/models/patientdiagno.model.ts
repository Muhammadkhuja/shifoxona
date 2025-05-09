import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Patient } from "../../patient/models/patient.model";
import { Diagnos } from "../../diagnos/models/diagno.model";
import { Doctor } from "../../doctor/models/doctor.model";

export interface IPatientDiagnosCreateAttr {
  patientId: number;
  diagnosId: number;
  doctorId: number;
  diagnos_date: Date;
  note: string;
}

@Table({ tableName: "patientdiagnos", timestamps: false })
export class PatientDiagnos extends Model<
  PatientDiagnos,
  IPatientDiagnosCreateAttr
> {
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

  @ForeignKey(() => Diagnos)
  @Column({ type: DataType.BIGINT })
  declare diagnosId: number;

  @BelongsTo(() => Diagnos)
  diadnos: Diagnos;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  dostor: Doctor;

  @Column({ type: DataType.DATE })
  declare diagnos_date: Date;

  @Column({ type: DataType.STRING })
  declare note: string;
}
