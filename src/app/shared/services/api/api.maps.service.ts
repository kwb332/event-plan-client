import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Http } from '@angular/http';
import{location} from '../models/location.model';
import{Event} from '../models/event.model'
import { httpFactory } from '@angular/http/src/http_module';
import { defineDirective } from '@angular/core/src/render3';
@Injectable({
  providedIn: 'root'
})
export class ApiMapsService {
  private curlocation : location;
  constructor(private http: HttpClient) {
    
  }
  getEventLocations(events : Event[])
  {
    let locations = [];
    var pos = 0;
    var arr = [];
    var size = events.length;
    events.map(event => {
      var address = event.street+", "+event.state;
      return this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyChRz9QNIFJJ6I3SfGlSHcMx7veSPV3TOM").subscribe(
        result => {
          console.log("Testing Testing Testing");
          console.log(JSON.stringify(result));
          this.curlocation = {
              lat : result.results[0].geometry.location.lat,
              lng : result.results[0].geometry.location.lat
          }
         
        }
      );
}).forEach(event => { 
  locations.push(event);

},pos);
alert(size);
if(pos == size)
{
 
    return locations;
}
     
  }
}
