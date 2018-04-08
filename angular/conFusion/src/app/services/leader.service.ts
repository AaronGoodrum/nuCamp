import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Leader } from '../shared/leader';
import { LEADERS } from './../shared/leaders';
import { baseURL } from '../shared/baseurl';

import { ProcessHttpMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LeaderService {
  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpMsgService,
    private restangular: Restangular) { }

  // getLeaders(): Observable<Leader[]> {
  //   return Observable.of(LEADERS).delay(2000);
  // }
  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  // getLeader(id: number): Observable<Leader> {
  //   return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
  // }
  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();
  }

  // getFeaturedLeader(): Observable<Leader> {
  //   return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
  // }
  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({ featured: true })
      .map(leaders => leaders[0]);
  }
}
