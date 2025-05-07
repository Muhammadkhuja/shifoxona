import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface IAdminCreateAttr {
  full_name: string;
  email: string;
  hashed_password: string;
}

@Table({ tableName: "admin", timestamps: false })
export class Admin extends Model<Admin, IAdminCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare full_name: string;

  @Column({ type: DataType.STRING })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creater: boolean;

  @Column({ type: DataType.STRING })
  declare refresh_token: string;
}
