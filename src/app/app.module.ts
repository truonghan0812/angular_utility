import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CreateComponent } from 'src/app/store/create/create.component';
import { ReadComponent } from 'src/app/store/read/read.component';
import { reducer } from 'src/app/store/reducers/tutorial.reducer';
import { SharedModule } from './shared/app.shared.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreComponent } from './store/store.component';
import { DomComponent } from './dom_manipulation/dom.component';
import { AddAttributeDirective } from './dom_manipulation/add-attribute.directive';
import { DComponent } from './dom_manipulation/d.component';
import { BComponent } from './dom_manipulation/b.component';
import { AComponent } from './dom_manipulation/a.component';
import { CComponent } from 'src/app/dom_manipulation/c.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { WikiService } from './search-box/wiki.service';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketComponent } from './websocket/websocket.component';
import { MarketChartComponent } from './websocket/market-chart/market-chart.component';
import { ThemeModule } from './theme/theme.module';
import { orangeTheme, purpleTheme } from './theme/themes';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    StoreComponent,
    DomComponent,
    AddAttributeDirective,
    AComponent,
    BComponent,
    CComponent,
    DComponent,
    SearchBoxComponent,
    WebsocketComponent,
    MarketChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      tutorial: reducer
    }),
    SharedModule,
    ReactiveFormsModule,
    ThemeModule.forRoot({
      themes: [orangeTheme, purpleTheme],
      active: 'orange'
    })
  ],
  providers: [WikiService],
  bootstrap: [AppComponent],
  entryComponents: [CComponent, DComponent]
})
export class AppModule {}
