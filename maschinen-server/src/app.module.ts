import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ForexModule } from './modules/forex/forex.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        ForexModule
    ]
})
export class AppModule {
}
