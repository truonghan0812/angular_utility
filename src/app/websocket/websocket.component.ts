import { Component, OnInit } from '@angular/core';
import { MarketPrice } from './market-price';
import { MarketStatusService } from './market-status.service';

@Component({
  selector: 'app-websocket',
  template: `
  <app-market-chart [marketStatus]="marketStatusToPlot"></app-market-chart>
  `,
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent {
  title = 'app';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MarketStatusService) {
    this.marketStatusSvc.getInitialMarketStatus().subscribe(prices => {
      this.MarketStatus = prices;

      let marketUpdateObservable = this.marketStatusSvc.getUpdates();
      marketUpdateObservable.subscribe((latestStatus: MarketPrice) => {
        this.MarketStatus = [latestStatus].concat(this.marketStatus);
      });
    });
  }
}
