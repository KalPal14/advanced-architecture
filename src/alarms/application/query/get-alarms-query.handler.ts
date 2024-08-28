import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { AlarmRepository } from '../ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery> {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  execute(): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
