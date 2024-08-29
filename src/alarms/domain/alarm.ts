import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-object/alarm-severity';

export class Alarm {
  public isAcknowledged: boolean = false;
  public items: AlarmItem[] = [];

  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
    public treggeredAt: Date,
  ) {}

  public acknowledgeAlarm(): void {
    this.isAcknowledged = true;
  }

  public addAlarmItem(alarmItem: AlarmItem) {
    this.items.push(alarmItem);
  }
}
