import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from './../shared/leaders';


@Injectable()
export class LeaderService {

  constructor() { }

  // -------------------------------
  // Simulating Time Delay within the Service
  // 6. Exercise (Instructions): Angular and Promise Part 2
  // -------------------------------

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    });
    // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}