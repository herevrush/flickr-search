import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {SearchService} from "./search.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [ SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
