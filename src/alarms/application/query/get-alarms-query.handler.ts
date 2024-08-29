import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery> {
  constructor(private readonly findAlarmsRepository: FindAlarmsRepository) {}

  execute(): Promise<AlarmReadModel[]> {
    return this.findAlarmsRepository.findAll();
  }
}
