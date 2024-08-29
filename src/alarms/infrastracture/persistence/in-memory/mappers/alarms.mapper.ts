import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from 'src/alarms/domain/value-object/alarm-severity';
import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmItemEntity } from '../entities/alarm-item.entity';

export class AlarmsMapper {
  static toDomain({
    id,
    name,
    severity,
    treggeredAt,
    isAcknowledged,
    items,
  }: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      severity as 'critical' | 'high' | 'medium' | 'low',
    );
    const alarmModel = new Alarm(id, name, alarmSeverity, treggeredAt);
    alarmModel.isAcknowledged = isAcknowledged;
    alarmModel.items = items.map(
      ({ id, name, type }) => new AlarmItem(id, name, type),
    );

    return alarmModel;
  }

  static toPersistence({
    id,
    name,
    severity,
    treggeredAt,
    isAcknowledged,
    items,
  }: Alarm): AlarmEntity {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = id;
    alarmEntity.name = name;
    alarmEntity.severity = severity.value;
    alarmEntity.treggeredAt = treggeredAt;
    alarmEntity.isAcknowledged = isAcknowledged;
    alarmEntity.items = items.map(({ id, name, type }) => {
      const alarmItemEntity = new AlarmItemEntity();
      alarmItemEntity.id = id;
      alarmItemEntity.name = name;
      alarmItemEntity.type = type;
      return alarmItemEntity;
    });
    return alarmEntity;
  }
}
