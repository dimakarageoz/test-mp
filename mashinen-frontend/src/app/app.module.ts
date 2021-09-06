import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { CouchModule } from './utils/modules/couch/couch.module';
import { ChartComponent } from './stocks/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CouchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
