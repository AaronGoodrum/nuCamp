import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  // -------------------------------
  // Simulating Time Delay within the Service
  // 6. Exercise (Instructions): Angular and Promise Part 2
  // 4. Exercise (Instructions): Angular and RxJS Part 1
  // -------------------------------

  getDishes(): Promise<Dish[]> {
    return Observable.of(DISHES).delay(2000).toPromise();
  }
  //   return new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES), 2000);
  //   });


  getDish(id: number): Promise<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000).toPromise();
  
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
  }

  getFeaturedDish(): Promise<Dish> {
      return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000).toPromise();

    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    }
  }


  // No Delay within the Service
  // getDishes(): Promise<Dish[]> {
  //   return Promise.resolve(DISHES);
  // }

  // getDish(id: number): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  // }

  // getFeaturedDish(): Promise<Dish> {
  //   return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }
