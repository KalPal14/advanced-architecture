import { InjectRepository } from '@nestjs/typeorm';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { AlarmsMapper } from '../mappers/alarms.mapper';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';

export class OrmCreateAlarmRepository implements CreateAlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmsMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmsMapper.toDomain(newEntity);
  }
}
