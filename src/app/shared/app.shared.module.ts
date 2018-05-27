/* 3rd party libraries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SwitchComponent } from './switch/switch.component';
import { AddressComponent } from './address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    /* angular stuff */
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    /* 3rd party components */
  ],
  declarations: [
    /* your components */
    NavComponent,
    CarouselComponent,
    SwitchComponent,
    AddressComponent
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    NavComponent,
    CarouselComponent,
    SwitchComponent,
    AddressComponent
    /* 3rd party components */
    /* our own custom components */
  ]
})
export class SharedModule { }