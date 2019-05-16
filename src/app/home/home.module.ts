import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {

  constructor() 
    { 
     
    }
 }
