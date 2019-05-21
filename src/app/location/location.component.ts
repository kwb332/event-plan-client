import { Component, OnInit } from '@angular/core';
import { ApiMapsService } from '../shared/services/api/api.maps.service';
import { ApiService } from '../shared/services/api/api.service';
import{location} from '../shared/services/models/location.model';
import{Event} from '../shared/services/models/event.model'
import { observable, Subscription } from 'rxjs';
import {MessagingService} from '../shared/services/messaging/messaging.service'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  public locations : location[] = [];
  public lat : number; 
  public lng : number;
  private curlocation : location;
  private messageSubscription : Subscription;

  constructor(private map : ApiMapsService, private messagingService : MessagingService, private apiService : ApiService) {
    this.messageSubscription = this.messagingService.getMessage().subscribe(message =>
      {
       
         if(message == "EventModified")
         {
           this.populateEventLocations();
         }
        
      },
      error=>
      {
        console.log(error);
      });
  }
   

  ngOnInit() {
    
    this.populateEventLocations();
  }

  populateEventLocations()
  {
      this.apiService.getEvents().subscribe(events =>
      {
        this.eventData = events;
        this.locations = [];
        let geoLocations : any[] = [];
        geoLocations = this.map.getEventLocations(this.eventData);
        var index = 0;
        geoLocations.map<any>(res => 
          {
             res.subscribe(location => {
             
              this.curlocation = {
                lat : location.results[0].geometry.location.lat,
                lng : location.results[0].geometry.location.lng,
                title: this.eventData[index].title,
                address: location.results[0].formatted_address,
                description: this.eventData[index].description,
                start: new Date(parseInt(this.eventData[index].startDate.toString())),
                end: new Date(parseInt(this.eventData[index].endDate.toString())),
  
              }
              index++;
        
              this.locations.push(this.curlocation);
      
              if(this.locations.length == 1)
              {
                this.lat = this.curlocation.lat;
                this.lng = this.curlocation.lng;
              }
             
        
             },
             error=>
             {
              console.log("Fork it like you talk it, failed");
               console.log(error);
             }
             )
   
          }
          
          ,
          error => {
            console.log(error);
          });
        
      },
      error =>
      {
        console.log(error);
      }) 
    
        
      //  this.lat = this.locations[0].lat;
        //this.lng = this.locations[0].lng;
  }

  eventData : Event[]=[];
  
  

}
