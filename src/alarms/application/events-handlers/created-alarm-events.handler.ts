import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAlarmEvent } from 'src/alarms/domain/events/created-alarm.event';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(CreatedAlarmEvent)
export class CreatedAlarmEventsHandler
  implements IEventHandler<CreatedAlarmEvent>
{
  private readonly logger = new Logger(CreatedAlarmEventsHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  handle({ alarm }: CreatedAlarmEvent) {
    this.logger.log(
      `Received event about created alarm: ${JSON.stringify(alarm)}`,
    );
    this.upsertMaterializedAlarmRepository.upsert({
      id: alarm.id,
      name: alarm.name,
      severity: alarm.severity.value,
      treggeredAt: alarm.treggeredAt,
      isAcknowledged: alarm.isAcknowledged,
      items: alarm.items,
    });
  }
}
