import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { Alarm } from 'src/alarms/domain/alarm';
import { CreatedAlarmEvent } from 'src/alarms/domain/events/created-alarm.event';
import { CreateAlarmRepository } from '../ports/create-alarm.repository';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmFactory: AlarmFactory,
    private readonly createAlarmRepository: CreateAlarmRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    this.logger.debug(
      `Processing "CreateAlarmCommand" ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.treggeredAt,
      command.items,
    );
    const newAlarm = await this.createAlarmRepository.save(alarm);

    // This is not yet the best way to dispatch events.
    // Domain events should be dispatched from the aggregate root, inside the domain layer.
    // We'll cover this in the upcoming lessons.
    this.eventBus.publish(new CreatedAlarmEvent(newAlarm));

    return newAlarm;
  }
}
