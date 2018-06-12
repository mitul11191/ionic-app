import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {


  private apiUrl: any = 'http://sit-api.capitaworld.com/mbl';
  private headers: any = {
    'Content-Type': 'application/json',
  }

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  //this method to signup api call
  signUpusers(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/registration', data, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //this method to Get OTP after signup
  submitOTP(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/validateOtp', data, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //this method fot login
  loginApp(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/login', data, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //this method to get loan list
  loanList(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/get_loan_list', data, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //this method to get loan details
  loanDetail(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/get_loan_details', data, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
