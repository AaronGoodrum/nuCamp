import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpMsgService) { }


  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
    .map(res => this.processHTTPMsgService.extractData(res) );
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => this.processHTTPMsgService.extractData(res));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => this.processHTTPMsgService.extractData(res)[0]);
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id));
  }


  // -------------------------------
  // Simulating Time Delay within the Service
  // 6. Exercise (Instructions): Angular and Promise Part 2
  // 4. Exercise (Instructions): Angular and RxJS Part 1
  // -------------------------------

    // getDishes(): Observable<Dish[]> {
    //   return Observable.of(DISHES).delay(2000);
    // }

    // getDish(id: number): Observable<Dish> {
    //   return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
    // }

    // getFeaturedDish(): Observable<Dish> {
    //     return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
    //   }

    // getDishIds(): Observable<number[]> {
    //   return Observable.of(DISHES.map(dish => dish.id )).delay(2000);
    // }

  }
