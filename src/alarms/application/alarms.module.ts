import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm-command.hendler';
import { GetAlarmsQueryHandler } from './query/get-alarms-query.handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
  ],
})
export class AlarmsModule {
  static withInfrastracture(infrastractureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastractureModule],
    };
  }
}
