import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpMsgService,
    private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({ featured: true })
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id))
      .catch(error => error);
  }

  // getDishes(): Observable<Dish[]> {
  //   return this.http.get(baseURL + 'dishes')
  //   .map(res => this.processHTTPMsgService.extractData(res))
  //   .catch(error => this.processHTTPMsgService.handleError(error));
  // }

  // getDish(id: number): Observable<Dish> {
  //   return this.http.get(baseURL + 'dishes/' + id)
  //     .map(res => this.processHTTPMsgService.extractData(res))
  //     .catch(error => this.processHTTPMsgService.handleError(error));
  // }

  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get(baseURL + 'dishes?featured=true')
  //     .map(res => this.processHTTPMsgService.extractData(res)[0])
  //     .catch(error => this.processHTTPMsgService.handleError(error));
  // }

  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes()
  //     .map(dishes => dishes.map(dish => dish.id))
  //     .catch(error => error);
  // }
}
