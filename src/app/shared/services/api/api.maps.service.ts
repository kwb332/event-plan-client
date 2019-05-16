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

    events.map(event => {
      return this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyChRz9QNIFJJ6I3SfGlSHcMx7veSPV3TOM").subscribe(
        result => {
          this.curlocation = {
              lat : result.data.result[0].geometry.location.lat,
              lng : result.data.result[0].geometry.location.lat
          }
        }
      );
}).forEach(event => locations.push(event));
       return locations;
     
  }
}
