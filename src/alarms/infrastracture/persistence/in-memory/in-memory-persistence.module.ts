import { Module } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { InMemoryAlarmsRepository } from './repositories/alarms.repository';

@Module({
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmsRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryPersistenceModule {}
