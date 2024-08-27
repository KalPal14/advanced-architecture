import { Module } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { OrmAlarmsRepository } from './repositories/alarms.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmsRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class OrmPersistenceModule {}
