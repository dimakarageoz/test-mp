export enum StockItems {
  AAPL = 'AAPL',
  BABA = 'BABA',
  IBM = 'IBM'
}

export const StockLabel: Record<StockItems, string> = {
  [StockItems.AAPL]: 'Apple',
  [StockItems.BABA]: 'Alibaba',
  [StockItems.IBM]: 'IBM'
};

export const StockColor: Record<StockItems, string> = {
  [StockItems.AAPL]: '#80de0d',
  [StockItems.BABA]: '#ee8d15',
  [StockItems.IBM]: '#05a2e3'
}
