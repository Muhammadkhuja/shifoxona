import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { Diagnos } from "../../diagnos/models/diagno.model";
import { Medication } from "../../medication/models/medication.model";

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
  @ForeignKey(() => Diagnos)
  @Column({
    type: DataType.BIGINT,
  })
  declare diagnosId: number;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.BIGINT,
  })
  declare medisineId: number;

  @BelongsTo(() => Diagnos)
  diagnos: Diagnos;

  @BelongsTo(() => Medication)
  medication: Medication;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_standart: boolean;
}
