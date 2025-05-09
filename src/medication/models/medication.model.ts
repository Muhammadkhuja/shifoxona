import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { DiagnosMedisine } from "../../diagnosmedisine/models/diagnosmedisine.model";
import { Diagnos } from "../../diagnos/models/diagno.model";

export interface IMedicationCreateAttr {
  name: string;
  description: string;
  dosage: string;
  manufacturer: string;
  price: string;
}

@Table({ tableName: "medication", timestamps: false })
export class Medication extends Model<Medication, IMedicationCreateAttr> {
  @Column({ type: DataType.BIGINT, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare dosage: string;

  @Column({ type: DataType.STRING })
  declare manufacturer: string;

  @Column({ type: DataType.STRING })
  declare price: string;

  @BelongsToMany(() => Diagnos, () => DiagnosMedisine)
  ddd: DiagnosMedisine;
}
