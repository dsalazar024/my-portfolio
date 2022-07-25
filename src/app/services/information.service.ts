import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }

  getProfile(): Promise<any> {
    return this.http.get('assets/profile.json').toPromise();
  }

  getBase64CV(): Promise<any> {
    return this.http.get('').toPromise();
  }

}
