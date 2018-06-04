import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      tutorial: reducer
    }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CComponent, DComponent]
})
export class AppModule {}
