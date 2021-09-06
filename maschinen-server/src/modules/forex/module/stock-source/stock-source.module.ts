import { HttpModule, Module } from '@nestjs/common';
import { StockDataService } from './stock-data.service';
import { ConfigurationModule } from '../../../../configuration/configuration.module';

@Module({
    providers: [
        StockDataService
    ],
    imports: [
        HttpModule,
        ConfigurationModule
    ],
    exports: [StockDataService]
})
export class StockSourceModule {}