import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmsMapper } from '../mappers/alarms.mapper';
import { AlarmEntity } from '../entities/alarm.entity';

export class InMemoryAlarmsRepository implements AlarmRepository {
  private alarms = new Map<string, AlarmEntity>();

  async findAll(): Promise<Alarm[]> {
    const alarms = Array.from(this.alarms.values());
    return alarms.map((alarm) => AlarmsMapper.toDomain(alarm));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmsMapper.toPersistence(alarm);
    this.alarms.set(alarm.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmsMapper.toDomain(newEntity);
  }
}
