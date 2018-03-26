import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from './../shared/leaders';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaderService {

  constructor() { }

  // -------------------------------
  // Simulating Time Delay within the Service
  // 6. Exercise (Instructions): Angular and Promise Part 2
  // 4. Exercise (Instructions): Angular and RxJS Part 1
  // -------------------------------

  getLeaders(): Promise<Leader[]> {
    return Observable.of(LEADERS).delay(2000).toPromise();
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS), 2000);
    // });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
    
    return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000).toPromise();

    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    // });
    // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
 
    return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000).toPromise();
 
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // });
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}