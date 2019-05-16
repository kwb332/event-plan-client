import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventModalComponent } from './event.modal.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [EventModalComponent],
  exports: [EventModalComponent],

})
export class EventModalModule {}
