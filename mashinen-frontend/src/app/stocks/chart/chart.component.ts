import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IStockDataTimestamp, IStockTread } from '../../models/stock.models';
import { ChartService } from '../../utils/services/chart.service';
import { StockColor, StockLabel } from '../stock.constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @Input()
  public stockData!: IStockTread;

  @ViewChild('chartElem')
  public chart!: ElementRef<HTMLDivElement>;

  public ngAfterViewInit(): void {
    ChartService.createLineChartByTimestamps(
      this.stockData.data.map((item: IStockDataTimestamp) => ([+item.data.high, item.timestamp])),
      this.chart.nativeElement,
      '%Y-%m-%d %H:%M:%S',
      StockColor[this.stockData.name]
    )
  }

  public getLabel(name: string): string {
    return StockLabel[name];
  }
}
