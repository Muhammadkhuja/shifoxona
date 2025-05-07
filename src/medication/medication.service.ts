import { Injectable } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication) private medicationModel: typeof Medication
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMedicationDto);
  }

  findAll(): Promise<Medication[]> {
    return this.medicationModel.findAll();
  }

  findOne(id: number): Promise<Medication | null> {
    return this.medicationModel.findByPk(id);
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto
  ): Promise<Medication | null> {
    const updated = await this.medicationModel.update(updateMedicationDto, {
      where: { id },
      returning: true,
    });
    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.medicationModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "endi yo'q";
    }
    return "o'chirishni iloji bo'lmadi.";
  }
}
