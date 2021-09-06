import { IStock } from '../../../models/stock.models';

export interface IStockSchema {
    name: string,
    data: Array<IStock>
}