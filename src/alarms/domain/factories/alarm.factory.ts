import { randomUUID } from 'crypto';
import { AlarmSeverity } from '../value-object/alarm-severity';
import { Alarm } from '../alarm';
import { AlarmItem } from '../alarm-item';

export class AlarmFactory {
  create(
    name: string,
    severity: string,
    treggeredAt: Date,
    alarmItems: Array<{ name: string; type: string }>,
  ) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    const newAlarm = new Alarm(alarmId, name, alarmSeverity, treggeredAt);

    alarmItems
      .map(({ name, type }) => new AlarmItem(randomUUID(), name, type))
      .forEach((item) => newAlarm.addAlarmItem(item));

    return newAlarm;
  }
}
