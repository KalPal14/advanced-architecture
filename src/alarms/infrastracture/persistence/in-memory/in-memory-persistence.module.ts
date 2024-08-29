import { Module } from '@nestjs/common';
import { InMemoryAlarmsRepository } from './repositories/alarms.repository';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';

@Module({
  providers: [
    InMemoryAlarmsRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryAlarmsRepository,
    },
    {
      provide: FindAlarmsRepository,
      useExisting: InMemoryAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmsRepository,
    },
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class InMemoryPersistenceModule {}
