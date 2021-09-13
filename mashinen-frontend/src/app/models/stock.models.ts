import { StockItems } from '../stocks/stock.constants';

export interface IStockTread {
  _id: string,
  name: StockItems,
  data: Array<IStockDataTimestamp>
}

export interface IStockDataTimestamp {
  timestamp: string,
  data: {
    high: string,
    low: string
  }
}
