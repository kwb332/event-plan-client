import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    EventModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyChRz9QNIFJJ6I3SfGlSHcMx7veSPV3TOM'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
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
      apollo.create({
        link: httpLink.create({ uri: environment.graphqlEndpoint }),
        cache: new InMemoryCache()
      });
    }
 }
