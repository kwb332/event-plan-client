import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api/api.service';
import { EventInput } from '../services/models/event.model';
import {MessagingService} from '../services/messaging/messaging.service'
import { state } from '@angular/animations';

@Component({
  selector: 'app-modal-event',
  templateUrl: './event.modal.component.html',
  styleUrls: ['./event.modal.component.css']
})
export class EventModalComponent {
  closeResult: string;
  poster : string = "raggio@brickbase.com";
  state : string ="";
  description:string ="";
  title: string = "";
  type: string = "";
  street : string= "";
  primary : string="";
  secondary : string="";
  start : Date = null;
  end : Date = null;

  constructor(private modalService: NgbModal, private messagingService: MessagingService,  private snackBar : MatSnackBar, private apiService : ApiService) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openSnackBar(message: string): void{
      this.snackBar.open(message, null,{
          duration:3000
      });
  }
  addEvent()
  {
      let newEvent : EventInput = 
      {
       description: this.description,
       endDate  : this.end,
       startDate : this.start,
       secondaryColor : this.secondary,
       state : this.state,
       street : this.street,
       poster : this.poster,
       primaryColor: this.primary,
       title: this.title,
       type : this.type
      };

      if(this.checkFields(newEvent))
      {
        this.apiService.getEvents().subscribe(events =>
          {
           
            
            var conflicts =  events.filter(curEvent => curEvent.startDate >= newEvent.startDate && curEvent.endDate <= newEvent.endDate);
            
            conflicts  = conflicts.filter(curEvent => curEvent.street.includes(newEvent.street) == true);
            conflicts  = conflicts.filter(curEvent => curEvent.state.includes(newEvent.state) == true);
          
       
            if(conflicts.length == 0)
            {
              this.apiService.addEvent(newEvent).subscribe(isCreated=>
                {
                   
                      this.messagingService.sendObject(newEvent);
                      this.openSnackBar("New Event Successfully Added");
                      this.modalService.dismissAll();
                   
                },
                error =>
                {
                   console.log(error);
                   this.openSnackBar("Error Adding new Event");
                }
              );
            }
            else
            {
              this.openSnackBar("Sorry. Event already exists in this time slot and location");
            }
          },
          error=>
          {
            console.log(error);
            this.openSnackBar("Error Adding new Event");
          }
          )
       
      
       
      }
      else
      {
        this.openSnackBar("Invalid Inputs, Please Fix Inputs");
      }
     /* this.apiService.addEvent(newEvent).subscribe(result=>
        {
            this.openSnackBar("New Event Successfully added");
            this.modalService.dismissAll();
        },
        
        error=>
        {
            this.openSnackBar("Failure adding new Event");
        }) */
     
  }
  checkFields(eventInput : EventInput) : boolean
  {
    if(eventInput.startDate > eventInput.endDate)
    {
      this.openSnackBar("Start Date can't be greater than End Date")
      return false;
    }
    if(this.state == "")
    {
       return false;
    }
    if(this.description == "")
    {
        return false;
    }
    if(this.title == "")
    {
        return false;
    }
    if(this.type == "")
    {
        return false;
    }
    if(this.street == "")
    {
        return false;
    }
    if(this.primary == "")
    {
        return false;
    }
    if(this.secondary == "")
    {
        return false;
    }
    if(this.start == null)
    {
        return false;
    }
    if(this.end == null)
    {
        return false;
    }
    
    return true;
  }
 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
