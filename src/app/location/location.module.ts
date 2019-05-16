import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './location.component';


@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  exports: [LocationComponent],
  providers: [],
})
export class LocationModule {

  constructor() 
    { 
     
    }
 }
