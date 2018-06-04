/* https://www.youtube.com/watch?v=vz9cNCkaPsY&t=0s&list=PLONyzFEUb51RAoaF6ilIrizbLZKIpuUL9&index=26
1. Put rendering logic in directive
   Put presentation login in component
   Use data binding mechanism to communicate between component and directive
Benefits: Rendering logic reuse across the application

2. Remove a component:
  Wrap component in ng-template
  Add new ng-container
  Add component to parent using create embbeded view method of container
  Use container to remove child component
  How to check: use Viewchildren to get all ElementRef and check its length

3. Dynamic add component:
  Add ng-container
  Add target component to entryComponents of Main module
  Use ComponentFactoryResolver to create a factory for target component :this.resolver.resolveComponentFactory 
  Create target component use createComponent method of containter
*/

import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { reducer } from 'src/app/store/reducers/tutorial.reducer';
import { ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DComponent } from './d.component';
import { CComponent } from 'src/app/dom_manipulation/c.component';
import { ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styles: ['[highlight] {color:red}']
})
export class DomComponent implements AfterViewInit, AfterViewChecked {
  @ViewChildren('aCp', { read: ElementRef })
  childComps: QueryList<ElementRef>;

  @ViewChild('ctn', { read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  @ViewChild('ctn1', { read: ViewContainerRef })
  viewContainer1: ViewContainerRef;

  @ViewChild('ta', { read: TemplateRef })
  aTemplateRef: TemplateRef<any>;

  @ViewChild('tb', { read: TemplateRef })
  bTemplateRef: TemplateRef<null>;

  conponent = null;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.viewContainer.createEmbeddedView(this.aTemplateRef);
    this.viewContainer.createEmbeddedView(this.bTemplateRef);
  }

  ngAfterViewChecked(): void {
    console.log('Number of child components: ' + this.childComps.length);
  }

  remove() {
    this.viewContainer.remove();
  }

  show(type) {
    this.conponent = type === 'c' ? CComponent : DComponent;
    const factory = this.resolver.resolveComponentFactory(this.conponent);
    this.viewContainer1.clear();
    this.viewContainer1.createComponent(factory);
  }

  // remove() {
  // this.renderer.removeChild(
  //   this.host.nativeElement.querySelector("#removeDom"),
  //   this.childComps.first.nativeElement
  // );
  // }
}
