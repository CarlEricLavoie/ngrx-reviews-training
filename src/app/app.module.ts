import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReviewsModule} from "./reviews/reviews.module";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    BrowserModule,
    ReviewsModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
