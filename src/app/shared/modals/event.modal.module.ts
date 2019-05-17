import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventModalComponent } from './event.modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, NgbModule, FormsModule],
  declarations: [EventModalComponent],
  exports: [EventModalComponent],

})
export class EventModalModule {}
