import { Component, OnInit } from '@angular/core';
import { ApiMapsService } from '../shared/services/api/api.maps.service';
import { ApiService } from '../shared/services/api/api.service';
import{location} from '../shared/services/models/location.model'

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
    this.apiService.getEvents().subscribe(events =>
      {
        console.log("we in");
        alert();
        this.locations = this.map.getEventLocations(events);
        this.lat = this.locations[0].lat;
        this.lng = this.locations[0].lng;
      },
      error =>
      {
        console.log(error);
      })
    
  }

}
