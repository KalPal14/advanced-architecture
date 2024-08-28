import { Alarm } from '../alarm';

export class CreatedAlarmEvent {
  constructor(public readonly alarm: Alarm) {}
}
