import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ApiMapsService {

  constructor(private http: HttpClient) {
    
  }
}
