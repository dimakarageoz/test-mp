export interface IStockTread {
  _id: string,
  name: string,
  data: Array<IStockDataTimestamp>
}

export interface IStockDataTimestamp {
  timestamp: string,
  data: {
    high: string,
    low: string
  }
}
