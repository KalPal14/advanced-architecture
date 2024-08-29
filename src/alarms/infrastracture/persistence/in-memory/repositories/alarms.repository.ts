import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmsMapper } from '../mappers/alarms.mapper';
import { AlarmEntity } from '../entities/alarm.entity';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

let CLASS_INITIALIZED_COUNT = 0;

export class InMemoryAlarmsRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private alarms = new Map<string, AlarmEntity>();
  private materializedAlarmView = new Map<string, AlarmReadModel>();

  constructor() {
    console.log(CLASS_INITIALIZED_COUNT, 'CLASS_INITIALIZED_COUNT');
    CLASS_INITIALIZED_COUNT++;
  }

  async findAll(): Promise<AlarmReadModel[]> {
    console.log(
      this.materializedAlarmView,
      Array.from(this.materializedAlarmView.values()),
    );
    return Array.from(this.materializedAlarmView.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmsMapper.toPersistence(alarm);
    this.alarms.set(alarm.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmsMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    console.log(alarm, 'upsert');
    if (this.materializedAlarmView.has(alarm.id)) {
      console.log(1);
      this.materializedAlarmView.set(alarm.id, {
        ...this.materializedAlarmView.get(alarm.id),
        ...alarm,
      });
      return;
    }
    console.log(2);
    this.materializedAlarmView.set(alarm.id, alarm as AlarmReadModel);
    console.log(this.materializedAlarmView);
  }
}
