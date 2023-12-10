import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = 'http://synthlab.localhost'

  public post(endpoint: string, body?: any){
    const requestUrl: string = `${this.apiUrl}${endpoint}`;
    return this.http.post(requestUrl, body);
  }

  public get(){

  }

}
