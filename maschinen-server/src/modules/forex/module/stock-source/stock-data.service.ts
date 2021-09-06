import * as axios from 'axios'

import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../../../constants/config.constants';
import { responseMapper } from './stock-data.mapper';
import { IStock } from '../../../../models/stock.models';

const GET_STOCK = '/query?function=TIME_SERIES_INTRADAY&symbol={company}&interval=1min&apikey={stockAuthKey}';

@Injectable()
export class StockDataService {

    constructor(
        private httpService: HttpService,
        private configService: ConfigService
    ) {}

    public getStockData(stockName: string): Promise<Array<IStock> | void> {
        try {
            // NestJs doesn't work well with code that is run on "OnInit" Hook (HttpService.get throw the issue)
            // I didn't find the explanation of the bug, but after searching,
            // I found out that it's the usual case
            //
            // return this.httpService.get<Array<IStock>>(this.getSourceUrl(stockName))
            return axios.default.get<Array<IStock>>(this.getSourceUrl(stockName))
                .then(res => responseMapper(res.data))
                .catch((e: Error) => console.log('Error Stock Request: ', e.message));
        } catch (e) {
            console.log(e);
        }
    }

    private getSourceUrl(stockName: string): string {
        const stockBase = this.configService.get(Environment.StockUrl, '');
        const token = this.configService.get(Environment.StockAuth, '');
        const getStock = GET_STOCK
            .replace('{stockAuthKey}', token)
            .replace('{company}', stockName);

        return stockBase + getStock;
    }
}