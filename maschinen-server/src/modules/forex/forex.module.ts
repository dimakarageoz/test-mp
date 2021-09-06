import { Module } from '@nestjs/common';
import { StockSourceModule } from './module/stock-source/stock-source.module';
import { ForexDomain } from './domains/forex.domain';
import { DatabaseModule } from '../../database/database.module';
import { ForexScheduleJob } from './schedule/forex.schedule';
import { ConfigurationModule } from '../../configuration/configuration.module';

@Module({
    providers: [
        ForexDomain,
        ForexScheduleJob
    ],
    imports: [
        ConfigurationModule,
        StockSourceModule,
        DatabaseModule
    ]
})
export class ForexModule {}