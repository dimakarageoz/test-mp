import { Injectable } from '@nestjs/common';
import { StockDataService } from '../module/stock-source/stock-data.service';
import { StocksItems } from '../constants/stock.constants';
import { DatabaseService } from '../../../database/database.service';
import { IStock } from '../../../models/stock.models';

@Injectable()
export class ForexDomain {

    constructor(
        private stockDataService: StockDataService,
        private databaseService: DatabaseService
    ) {}

    public async uploadStock(): Promise<void> {
        try {
            await this.loadStocksData();
        } catch (e) {
            console.log('Error on stock load process');
        }
    }

    private async loadStocksData(): Promise<void> {
        await Promise.all([
            StocksItems.map(async (stockName: string) => {
                const stockData = await this.stockDataService.getStockData(stockName);

                if (stockData) {
                    await this.saveStockData(stockName, stockData)
                }
            })
        ]);
    }

    private async saveStockData(name: string, data: Array<IStock>): Promise<void> {
        await this.databaseService.createOrUpdate({ name, data })
    }
}