import { InjectRepository } from '@nestjs/typeorm';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { Repository } from 'typeorm';
import { AlarmsMapper } from '../mappers/alarms.mapper';

export class OrmAlarmsRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(): Promise<Alarm[]> {
    const alarms = await this.alarmRepository.find();
    return alarms.map((alarm) => AlarmsMapper.toDomain(alarm));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmsMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmsMapper.toDomain(newEntity);
  }
}
