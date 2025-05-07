import { Table, Column, Model, DataType } from "sequelize-typescript";

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
}
