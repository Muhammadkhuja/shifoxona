import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

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

//   @ForeignKey(() => Patient)
  @Column({ type: DataType.BIGINT })
  declare patientId: number;

//   @ForeignKey(() => Diagnos)
  @Column({ type: DataType.BIGINT })
  declare diagnosId: number;

//   @ForeignKey(() => Doctor)
  @Column({ type: DataType.BIGINT })
  declare doctorId: number;

  @Column({ type: DataType.DATE })
  declare diagnos_date: Date;

  @Column({ type: DataType.STRING })
  declare note: string;
}
