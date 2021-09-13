import { IStock } from '../../../models/stock.models';
import { StockNames } from '../../../modules/forex/constants/stock.constants';

export interface IStockSchema {
    name: StockNames,
    data: Array<IStock>
}