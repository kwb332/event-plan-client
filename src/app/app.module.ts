import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventCalendarModule } from './event-calendar/event-calendar.module';
import { EventModule} from './event/event.module'
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { LocationModule } from './location/location.module';
import { HomeModule } from './home/home.module';
import {AgmCoreModule} from '@agm/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApolloLink, concat } from 'apollo-link';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { EventModalModule } from './shared/modals/event.modal.module';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events',      component: EventComponent },
  { path: 'locations',      component: LocationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    EventModalModule,
    EventModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyChRz9QNIFJJ6I3SfGlSHcMx7veSPV3TOM'
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    EventCalendarModule,
    LocationModule,
    HomeModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ApolloModule,
    HttpLinkModule,
    HttpModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink) 
    { 
      const authMiddleware = new ApolloLink((operation,forward) => {
        const currentUserToken = 'erererere-erere-ererere';
        if(currentUserToken){
          operation.setContext({
            headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200')
          })
        }
    
      return forward(operation)
    });      
      apollo.create({
       
        link: concat(authMiddleware,  httpLink.create({ uri: environment.graphqlEndpoint })),
        cache: new InMemoryCache()
      });
    }
 }
