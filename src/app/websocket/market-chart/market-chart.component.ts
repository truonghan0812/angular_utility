import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { MarketPrice } from '../market-price';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-market-chart',
  template: `<div #chart></div>`,
  styleUrls: ['./market-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketChartComponent implements OnChanges {
  @ViewChild('chart') chartEL: ElementRef;

  parseDate = d3.timeParse('%d-%m-%Y');

  @Input() marketStatus: MarketPrice[];

  private _svgElement: HTMLElement;

  private _chartProps: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.marketStatus && this._chartProps) {
      this.updateChart();
    } else if (this.marketStatus) {
      this.buildChart();
    }
  }

  formatDate() {
    this.marketStatus.forEach(ms => {
      if (typeof ms.date === 'string') {
        ms.date = this.parseDate(ms.date);
      }
    });
  }

  buildChart() {
    this._chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this._chartProps.x = d3.scaleTime().range([0, width]);
    this._chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(this._chartProps.x);
    var yAxis = d3.axisLeft(this._chartProps.y).ticks(5);

    let _this = this;

    // Define the line
    var valueline = d3
      .line<MarketPrice>()
      .x(function(d) {
        if (d.date instanceof Date) {
          return _this._chartProps.x(d.date.getTime());
        }
      })
      .y(function(d) {
        console.log('Close market');
        return _this._chartProps.y(d.close);
      });

    // Define the line
    var valueline2 = d3
      .line<MarketPrice>()
      .x(function(d) {
        if (d.date instanceof Date) {
          return _this._chartProps.x(d.date.getTime());
        }
      })
      .y(function(d) {
        console.log('Open market');
        return _this._chartProps.y(d.open);
      });

    var svg = d3
      .select(this.chartEL.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this._chartProps.x.domain(
      d3.extent(_this.marketStatus, function(d) {
        if (d.date instanceof Date) return (d.date as Date).getTime();
      })
    );
    this._chartProps.y.domain([
      0,
      d3.max(this.marketStatus, function(d) {
        return Math.max(d.close, d.open);
      })
    ]);

    // Add the valueline2 path.
    svg
      .append('path')
      .attr('class', 'line line2')
      .style('stroke', 'green')
      .style('fill', 'none')
      .attr('d', valueline2(_this.marketStatus));

    // Add the valueline path.
    svg
      .append('path')
      .attr('class', 'line line1')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', valueline(_this.marketStatus));

    // Add the X Axis
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Setting the required objects in _chartProps so they could be used to update the chart
    this._chartProps.svg = svg;
    this._chartProps.valueline = valueline;
    this._chartProps.valueline2 = valueline2;
    this._chartProps.xAxis = xAxis;
    this._chartProps.yAxis = yAxis;
  }
  updateChart() {
    let _this = this;
    this.formatDate();

    // Scale the range of the data again
    this._chartProps.x.domain(
      d3.extent(this.marketStatus, function(d) {
        if (d.date instanceof Date) {
          return d.date.getTime();
        }
      })
    );

    this._chartProps.y.domain([
      0,
      d3.max(this.marketStatus, function(d) {
        return Math.max(d.close, d.open);
      })
    ]);

    // Select the section we want to apply our changes to
    this._chartProps.svg.transition();

    // Make the changes to the line chart
    this._chartProps.svg
      .select('.line.line1') // update the line
      .attr('d', this._chartProps.valueline(this.marketStatus));

    this._chartProps.svg
      .select('.line.line2') // update the line
      .attr('d', this._chartProps.valueline2(this.marketStatus));

    this._chartProps.svg
      .select('.x.axis') // update x axis
      .call(this._chartProps.xAxis);

    this._chartProps.svg
      .select('.y.axis') // update y axis
      .call(this._chartProps.yAxis);
  }
}
