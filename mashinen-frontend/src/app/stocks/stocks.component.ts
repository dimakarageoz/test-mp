import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ConfigService } from '../utils/services/config.service';
import { CouchServer } from '../utils/modules/couch/couch.service';
import { IStockTread } from '../models/stock.models';

@Component({
  selector: 'app-socks',
  templateUrl: './stocks.template.html'
})
export class StocksComponent implements OnInit {

  public stocks$!: Observable<Array<IStockTread>>;

  constructor(
    private couchServer: CouchServer
  ) {}

  public ngOnInit() {
    this.stocks$ = this.getStockInterval()
      .pipe(
        mergeMap(() => this.couchServer.getStocks()),
        map((items: Array<IStockTread>) =>
          items.sort((a: IStockTread, b: IStockTread) => a.name > b.name ? 1 : -1)
        )
      );
  }

  private getStockInterval(): Observable<number> {
    const intervalTime = +ConfigService.get('STOCK_INTERVAL');

    return timer(0, intervalTime);
  }
}
