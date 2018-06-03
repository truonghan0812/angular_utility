import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-d',
  template: `
    <h1>D component</h1>
  `
})
export class DComponent implements DoCheck {
  ngDoCheck(): void {
    console.log('ngDoCheck at D component');
  }
}
