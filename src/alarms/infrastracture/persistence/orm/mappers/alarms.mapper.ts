import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from 'src/alarms/domain/value-object/alarm-severity';

export class AlarmsMapper {
  static toDomain({ id, name, severity }: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      severity as 'critical' | 'high' | 'medium' | 'low',
    );
    const alarmModel = new Alarm(id, name, alarmSeverity);
    return alarmModel;
  }

  static toPersistence({ id, name, severity }: Alarm): AlarmEntity {
    const alarmEntity = new AlarmEntity();
    alarmEntity.id = id;
    alarmEntity.name = name;
    alarmEntity.severity = severity.value;
    return alarmEntity;
  }
}
