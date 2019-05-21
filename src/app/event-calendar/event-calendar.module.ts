import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EventCalendarComponent } from '../event-calendar/event-calendar.component';
import { EventCalendarHeaderComponent } from './event-calendar-header.component';
import { EventModalModule } from '../shared/modals/event.modal.module';
import {

  MatSnackBarModule,
 
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    MatSnackBarModule,
    EventModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [EventCalendarComponent, EventCalendarHeaderComponent],
 
  exports: [EventCalendarComponent, EventCalendarHeaderComponent]
})
export class EventCalendarModule {}


