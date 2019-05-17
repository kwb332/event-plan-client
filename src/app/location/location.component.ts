import { Component, OnInit } from '@angular/core';
import { ApiMapsService } from '../shared/services/api/api.maps.service';
import { ApiService } from '../shared/services/api/api.service';
import{location} from '../shared/services/models/location.model';
import{Event} from '../shared/services/models/event.model'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private locations : location[];
  private lat : number;
  private lng : number;
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

      this.locations = this.map.getEventLocations(this.eventData);
      console.log("This is the first time");
      console.log(JSON.stringify(this.locations));
        this.lat = this.locations[0].lat;
        this.lng = this.locations[0].lng;
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
