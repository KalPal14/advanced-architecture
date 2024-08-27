import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { OrmPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({})
export class AlarmInfrastractureModule {
  static use(driver: 'in-memory' | 'orm'): DynamicModule {
    const persistenceModule =
      driver === 'in-memory' ? InMemoryPersistenceModule : OrmPersistenceModule;

    return {
      module: AlarmInfrastractureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
