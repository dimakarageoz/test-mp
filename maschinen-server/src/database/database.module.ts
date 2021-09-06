import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../constants/config.constants';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
    providers: [
        {
            provide: DatabaseService,
            useFactory: (config: ConfigService): Promise<DatabaseService> => {
                return DatabaseService.create(
                    config.get(Environment.CouchDatabase, ''),
                    config.get(Environment.DatabaseName, '')
                );
            },
            inject: [ConfigService]
        }
    ],
    exports: [DatabaseService],
    imports: [ConfigurationModule]
})
export class DatabaseModule {}