import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
let apiUrl = 'http://localhost:8080/rest/';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:Http) { }

  login(data) {
    console.log(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'login', data, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  };
  logout() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'logout', { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  };
  postRequest(data,url){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+url,data,{headers: headers})
      .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  };
  getRequest(url){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(apiUrl+url,{headers: headers})
      .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  };
}
