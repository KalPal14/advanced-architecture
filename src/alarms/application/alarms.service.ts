import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  create({ name, severity }: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(name, severity);
    return this.alarmRepository.save(alarm);
  }

  findAll() {
    return this.alarmRepository.findAll();
  }
}
