import { Component, OnInit } from '@angular/core';
import { ApiMapsService } from '../shared/services/api/api.maps.service';
import { ApiService } from '../shared/services/api/api.service';
import{location} from '../shared/services/models/location.model';
import{Event} from '../shared/services/models/event.model'
import { observable } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private locations : location[] = [];
  private lat : number; 
  private lng : number;
  private curlocation : location;
  constructor(private map : ApiMapsService, private apiService : ApiService) { }

  ngOnInit() {
    
    this.populateEventLocations();
  }

  populateEventLocations()
  {
   /* this.apiService.getEvents().subscribe(events =>
      {
        this.locations = this.map.getEventLocations(events);
        this.lat = this.locations[0].lat;
        this.lng = this.locations[0].lng;
      },
      error =>
      {
        console.log(error);
      }) */
    
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
              start: this.eventData[index].startDate,
              end: this.eventData[index].endDate

            }
            index++;
      
            this.locations.push(this.curlocation);
    
            if(this.locations.length == 1)
            {
              this.lat = this.curlocation.lat;
              this.lng = this.curlocation.lng;
            }
           
            //console.log("Fork it like you talk it");
            //console.log(this.curlocation);
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
        
      //  this.lat = this.locations[0].lat;
        //this.lng = this.locations[0].lng;
  }

  eventData : Event[]=[
    {
        id: 1,
        title: 'Millennium Park',
        poster: 'kwb332',
        type: 'Site',
        description: 'Historical Site in Chicago',
        street: '201 E Randolph St, Chicago',
        state: 'IL',
        primaryColor: 'Red',
        secondaryColor:'blue',
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
        secondaryColor:'blue',
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
        secondaryColor:'blue',
        startDate: new Date('02/08/2019'),
        endDate: new Date('02/10/2019')
    }
  ];
  

}
