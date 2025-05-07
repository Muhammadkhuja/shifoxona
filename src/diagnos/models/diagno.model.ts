import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface IDiagnosCreateAttr {
  diagnos_code: string;
  diagnos: string;
  description: string;
  created_by: number;
}

@Table({ tableName: "diagnos", timestamps: false })
export class Diagnos extends Model<Diagnos, IDiagnosCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare diagnos_code: string;

  @Column({ type: DataType.STRING })
  declare diagnos: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.BIGINT })
  declare created_by: number;
}
