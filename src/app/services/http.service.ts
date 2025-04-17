import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = environment.apiUrl;

  public post(endpoint: string, body?: any){
    const requestUrl: string = `${this.apiUrl}${endpoint}`;
    return this.http.post(requestUrl, body);
  }

  public get(endpoint: string, params?: any) {
    const requestUrl: string = `${this.apiUrl}${endpoint}`;
    return this.http.get(requestUrl, { params });
  }

}
