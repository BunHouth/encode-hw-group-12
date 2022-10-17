import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl = 'https://my-erc20-api.herokuapp.com';
  constructor(private http: HttpClient) { }

  vote(body: {proposalId: Number, amount: Number}) {
    return this.http.post(`${this.baseUrl}/vote`, body);
  }

  delegate(body: {delegateeAddress: String}) {
    return this.http.post(`${this.baseUrl}/delegate-vote`, body);
  }

  mint() {
    //TO-DO HERE
  }

  getRecentVotes() {
    //TO-DO HERE
  }

  getTotalSupply() {
    return this.http.get(`${this.baseUrl}/total-supply`);
  }

  getVoteResult() {
    return this.http.get(`${this.baseUrl}/voting-result`);
  }
}
