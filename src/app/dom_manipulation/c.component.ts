import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-c',
  template: `
    <h1>C component</h1>
  `
})
export class CComponent implements DoCheck {
  ngDoCheck(): void {
    console.log('ngDoCheck at C component');
  }
}
