import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAlarmEvent } from 'src/alarms/domain/events/created-alarm.event';

@EventsHandler(CreatedAlarmEvent)
export class CreatedAlarmEventsHandler
  implements IEventHandler<CreatedAlarmEvent>
{
  private readonly logger = new Logger(CreatedAlarmEventsHandler.name);

  handle(event: CreatedAlarmEvent) {
    this.logger.log(
      `Received event about created alarm: ${JSON.stringify(event.alarm)}`,
    );
  }
}
