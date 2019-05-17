import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Http } from '@angular/http';
import{location} from '../models/location.model';
import{Event} from '../models/event.model'
import { httpFactory } from '@angular/http/src/http_module';
import { defineDirective } from '@angular/core/src/render3';
import { forkJoin } from 'rxjs';
import { Observable } from 'apollo-link';
@Injectable({
  providedIn: 'root'
})
export class ApiMapsService {
 
  constructor(private http: HttpClient) {
    
  }
  //https://stackoverflow.com/questions/40407298/calling-angular2-service-in-a-loop
  getEventLocations(events : Event[]) 
  {
    let locationObserverables = new Array();
    let locations : location[] = [];
    var pos = 0;
    var size = events.length;
    for(var i=0; i< size;i++)
    {
       var address = events[i].street+", "+events[i].state;
       locationObserverables.push(this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyChRz9QNIFJJ6I3SfGlSHcMx7veSPV3TOM"));
    }

forkJoin(locationObserverables).subscribe(
    res =>{

      
    },
    error =>
    {
      console.log(error);
    });

  
    return locationObserverables;
  }
  
}
