import * as Joi from 'joi';
import { Environment } from '../constants/config.constants';

export const configurationSchema = {
    [Environment.StockUrl]: Joi.string().required(),
    [Environment.CouchDatabase]: Joi.string().required(),
    [Environment.DatabaseName]: Joi.string().required(),
    [Environment.StockAuth]: Joi.string().required(),
    [Environment.StockConsumeInterval]: Joi.string().required()
};