import {Injectable} from '@angular/core';
import{Apollo} from 'apollo-angular';
import {Http} from '@angular/http';
import gql from 'graphql-tag';
import {Event, EventInput, EventUpdateInput} from '../models/event.model'
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
            _id
            title
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
      
            _id
            title
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

deleteEvent(id : string) : Observable<boolean>
{
    return this.apollo
       .mutate<any>({
        fetchPolicy: 'no-cache',
        mutation: gql`
        mutation
        {
           deleteEvent(_id : "${id}" )
        }
        `
    })
    .pipe(
      map(result => result.data.deleteEvent)
    );
}


addEvent(newEvent : EventInput) : Observable<boolean>
{
    return this.apollo
       .mutate<any>({
        fetchPolicy: 'no-cache',
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

updateEvent(updateEvent : EventUpdateInput) : Observable<boolean>
{
    return this.apollo
       .mutate<any>({
        fetchPolicy: 'no-cache',
        mutation: gql`
        mutation updateEvent($updateEvent : EventUpdateInput!) {
          updateEvent(updateEvent: $updateEvent)
          {
            _id
          }
        }
        
        `,
        variables:{
          updateEvent
        }
    })
    .pipe(
      map(result => result.data.updateEvent)
    );
}



}


 
