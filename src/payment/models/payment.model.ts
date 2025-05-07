import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

export interface IPaymentCreateAttr {
  appointmentId: number;
  amount: number;
  payment_method: string;
  payment_at: Date;
}

@Table({ tableName: "payment", timestamps: false })
export class Payment extends Model<Payment, IPaymentCreateAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  //   @ForeignKey(() => Appointment)
  @Column({ type: DataType.BIGINT })
  declare appointmentId: number;

  @Column({ type: DataType.BIGINT })
  declare amount: number;

  @Column({ type: DataType.STRING })
  declare payment_method: string;

  @Column({ type: DataType.DATE })
  declare payment_at: Date;
}
