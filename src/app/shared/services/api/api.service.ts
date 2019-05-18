import {Injectable} from '@angular/core';
import{Apollo} from 'apollo-angular';
import {Http} from '@angular/http';
import gql from 'graphql-tag';
import {Event, EventInput} from '../models/event.model'
import {Observable, Subscription} from 'rxjs';
import{map} from 'rxjs/operators';
import{HttpRequest, HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
   providedIn:'root'
})

export class ApiService{

constructor(private apollo: Apollo, private http: Http, private httpClient: HttpClient)
{
    
}

getEvents() : Observable<Event[]>
{
    return this.apollo
       .watchQuery<any>({
        fetchPolicy: 'network-only',
        query: gql`
        query
        {
          events
          {
            id
            _id
            description
            type
            poster
            startDate
            endDate
            street
            state
            primaryColor
            secondaryColor
    
          }
        }
        `,
      })
    .valueChanges
    .pipe(
      map(result => result.data.events)
    );
}
getEvent(id : number) : Observable<Event>
{
    return this.apollo
       .watchQuery<any>({
        fetchPolicy: 'network-only',
        query: gql`
        query
        {
          event(id :${id})
          {
            id
    description
    type
    poster
    startDate
    endDate
    street
    state
    primaryColor
    secondaryColor
    
            
          }
        }
        
        `,
    })
    .valueChanges
    .pipe(
      map(result => result.data.event)
    );
}

addEvent(newEvent : EventInput) : Observable<boolean>
{
    return this.apollo
       .mutate<any>({
        fetchPolicy: 'network-only',
        mutation: gql`
        mutation addEvent($newEvent : EventInput!){
            addEvent(newEvent: $newEvent)
        }  
        `,
        variables:{
            newEvent
        }
    })
    .pipe(
      map(result => result.data.addEvent)
    );
}

}


 
