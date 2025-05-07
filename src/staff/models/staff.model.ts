import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface IStaffCreateAttr {
  full_name: string;
  position: string;
  phone: string;
  email: string;
  hashed_password: string;
  salary: number;
}

@Table({ tableName: "staff" })
export class Staff extends Model<Staff, IStaffCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING })
  declare position: string;

  @Column({ type: DataType.STRING })
  declare phone: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @Column({ type: DataType.BIGINT })
  declare salary: number;

  @Column({ type: DataType.STRING })
  declare refresh_token: string;
}
