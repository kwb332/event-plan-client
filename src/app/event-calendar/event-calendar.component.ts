import {Component,ChangeDetectionStrategy,ViewChild, OnInit,TemplateRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { ApiService } from '../shared/services/api/api.service';
import {Event, EventInput, EventUpdateInput} from '../shared/services/models/event.model';
import {EventModalComponent} from '../shared/modals/event.modal.component';
import {MessagingService} from '../shared/services/messaging/messaging.service'
import {Subscription} from 'rxjs'
import {MatSnackBar} from '@angular/material';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
 



@Component({
  selector: 'app-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})

export class EventCalendarComponent implements OnInit {
private messageSubscription : Subscription;
private count : number = 0;
eventData : Event[]=[];
public events : CalendarEvent[] = [];
  getColor(color:string)
  {
    switch(color)
    {
      case 'Red':
        return colors.red;
      case 'Blue':
        return colors.blue;
      default:
         return colors.yellow;
    }
  }
  constructor(private modal: NgbModal, private snackBar : MatSnackBar, private apiService : ApiService, private messagingService : MessagingService ) {
    this.messageSubscription = this.messagingService.getObject().subscribe(newEventInput =>
      {
       
          let newEvent : Event = 
          {
             _id : newEventInput._id,
             description: newEventInput.description,
             endDate : newEventInput.endDate,
             startDate : newEventInput.startDate,
             secondaryColor : newEventInput.secondaryColor,
             state : newEventInput.state,
             street : newEventInput.street,
             poster : newEventInput.poster,
             primaryColor : newEventInput.primaryColor,
             title : newEventInput.title,
             type : newEventInput.type
          } 
    
         
           this.events = [
            ...this.events,
            {
              start: new Date(newEvent.startDate),
              _id : newEvent._id,
              end: new Date(newEvent.endDate),
              title: newEvent.title,
              color:  this.getColor(newEvent.primaryColor),
              allDay: true
            }
           
          ];
          this.refresh.next();
      },
      error=>
      {
        console.log(error);
      });
  }
  openSnackBar(message: string): void{
    this.snackBar.open(message, null,{
        duration:3000
    });
}
  ngOnInit() {
    this.loadEvents();
    this.count = this.eventData.length;
  }
  

  loadEvents()
  {
   
    this.eventData = [];
    this.events = [];
    this.apiService.getEvents().subscribe(event=>{
        this.eventData = event;
        console.log(JSON.stringify(event))
        
        this.eventData.map<CalendarEvent>(item => {
          return {
            start: new Date(parseInt(item.startDate.toString())),
            _id : item._id,
            end: new Date(parseInt(item.endDate.toString())),
            title: item.title,
            color:  this.getColor(item.primaryColor),
            allDay: true
          }
      }).forEach(item => this.events.push(item));
      this.refresh.next();
     
      
    },
    error=>
    {
        console.log(error);
    }); 



  }
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  /* eventData : Event[]=[
    {
        id: 1,
        title: 'Millennium Park',
        poster: 'kwb332',
        type: 'Site',
        description: 'Historical Site in Chicago',
        street: '201 E Randolph St, Chicago',
        state: 'IL',
        primaryColor: 'Red',
        secondaryColor:'Blue',
        startDate: new Date('02/02/2019'),
        endDate: new Date('02/04/2019')
    },
    {
        id: 2,
        title: 'Brandos Speak-Easy',
        poster: 'kwb332',
        type: 'Bar',
        description: 'A bar in Chicago',
        street: '343 S Dearborn St, Chicago',
        state: 'IL',
        primaryColor: 'Red',
        secondaryColor:'Blue',
        startDate: new Date('02/05/2019'),
        endDate: new Date('02/06/2019')
    },
    {
        id: 3,
        title: 'Bureau Bar',
        poster: 'kwb332',
        type: 'Bar',
        description: 'A South Loop hangout spot',
        street: '75 E 16th St, Chicago',
        state: 'IL',
        primaryColor: 'Red',
        secondaryColor:'Blue',
        startDate: new Date('02/08/2019'),
        endDate: new Date('02/10/2019')
    }
  ]; */
  /* events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ]; 

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
 /* events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ]; */

  activeDayIsOpen: boolean = true;

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;

      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
   
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
  
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
    
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
   
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
 
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.apiService.deleteEvent(eventToDelete._id).subscribe(
      results=>
      {
        this.messagingService.sendMessage("EventModified");
        this.events = this.events.filter(event => event !== eventToDelete);
        this.count--;
        this.openSnackBar("Event Successfully Deleted");
      },
      error=>
      {
        this.openSnackBar("Delete Operation Failed");
        console.log(error);
      }
    )
  
  }
 
  update(eventToUpdate: CalendarEvent) {
     let dbEvent : Event = null;
     dbEvent = this.eventData.filter(event => event._id == eventToUpdate._id)[0];
     let eventUpdate : EventUpdateInput =
     {
        _id : dbEvent._id,
        description : dbEvent.description,
        secondaryColor : eventToUpdate.color.secondary,
        primaryColor : eventToUpdate.color.primary,
        endDate : eventToUpdate.end,
        startDate : eventToUpdate.start,
        state : dbEvent.state,
        street : dbEvent.street,
        type: dbEvent.type,
        poster : dbEvent.poster,
        title : eventToUpdate.title

     };
   
    
     var conflicts =  this.eventData.filter(curEvent => curEvent.startDate >= eventToUpdate.start && curEvent.endDate <= eventToUpdate.end && curEvent._id != eventToUpdate._id);
            
            conflicts  = conflicts.filter(curEvent => curEvent.street.includes(eventUpdate.street) == true);
            conflicts  = conflicts.filter(curEvent => curEvent.state.includes(eventUpdate.state) == true);
    
    
     if(conflicts.length == 0)
    {
     this.apiService.updateEvent(eventUpdate).subscribe(
      results=>
      {
        this.messagingService.sendMessage("EventModified");
        this.events = this.events.filter(event => event._id !== eventToUpdate._id);
        this.events = [
          ...this.events,
           eventToUpdate
        ];
        this.openSnackBar("Event Successfully Updated");
      },
      error=>
      {
        this.openSnackBar("Event Updated Failed");
        console.log(error);
      }
    );
    }
    else
    {
      this.openSnackBar("Event Updated Failed.  There is a schedule conflict");
    }
  
  }
  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
