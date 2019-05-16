import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from './location.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule,
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
