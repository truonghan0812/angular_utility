/*
1. Put rendering logic in directive
   Put presentation login in component
   Use data binding mechanism to communicate between component and directive
Benefits: Rendering logic reuse across the application
*/



import { Component } from '@angular/core';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styles: ['[highlight] {color:red}']
})
export class DomComponent {
}
