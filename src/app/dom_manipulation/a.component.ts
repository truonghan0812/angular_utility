import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { DoCheck } from "@angular/core";

@Component({
  selector: "app-a",
  template: `
    <h1>A component</h1>
  `
})
export class AComponent implements DoCheck {
  ngDoCheck(): void {
    console.log("ngDoCheck at A component");
  }
  constructor() {}
}
