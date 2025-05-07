import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
} from "sequelize-typescript";

interface IDiagnosMedisineCreateAttr {
  diagnosId: number;
  medisineId: number;
  is_standart: boolean;
}

@Table({ tableName: "diagnosmedisine", timestamps: false })
export class DiagnosMedisine extends Model<
  DiagnosMedisine,
  IDiagnosMedisineCreateAttr
> {
//   @ForeignKey(() => Diagnos)
  @Column({
    type: DataType.BIGINT,
  })
  declare diagnosId: number;

//   @ForeignKey(() => Medication)
  @Column({
    type: DataType.BIGINT,
  })
  declare medisineId: number;

  @Column({
    type: DataType.BOOLEAN, defaultValue: false
  })
  declare is_standart: boolean;
}
