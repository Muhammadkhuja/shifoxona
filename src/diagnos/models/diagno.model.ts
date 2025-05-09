import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { PatientDiagnos } from "../../patientdiagnos/models/patientdiagno.model";
import { Doctor } from "../../doctor/models/doctor.model";
import { DiagnosMedisine } from "../../diagnosmedisine/models/diagnosmedisine.model";
import { Medication } from "../../medication/models/medication.model";

export interface IDiagnosCreateAttr {
  diagnos_code: string;
  diagnos: string;
  description: string;
  createdId: number;
}

@Table({ tableName: "diagnos", timestamps: false })
export class Diagnos extends Model<Diagnos, IDiagnosCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare diagnos_code: string;

  @Column({ type: DataType.STRING })
  declare diagnos: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare createdId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @HasMany(() => PatientDiagnos)
  patientdiagnos: PatientDiagnos;

  @BelongsToMany(() => Medication, () => DiagnosMedisine)
  ddd: DiagnosMedisine;
}
