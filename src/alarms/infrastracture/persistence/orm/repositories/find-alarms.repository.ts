import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { InjectModel } from '@nestjs/mongoose';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { Model } from 'mongoose';

export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly materializedAlarmViewModel: Model<MaterializedAlarmView>,
  ) {}

  findAll(): Promise<AlarmReadModel[]> {
    return this.materializedAlarmViewModel.find();
  }
}
