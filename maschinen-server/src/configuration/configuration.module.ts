import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { configurationSchema } from './configuration.schema';

@Module({
    imports: [ConfigModule.forRoot({
        validationSchema: Joi.object(configurationSchema)
    })],
    exports: [ConfigModule]
})
export class ConfigurationModule {

}