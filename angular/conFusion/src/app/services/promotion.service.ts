import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { baseURL } from '../shared/baseurl';

import { ProcessHttpMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHttpMsgService,
    private restangular: Restangular) { }


  // getPromotions(): Observable<Promotion[]> {
  //   return Observable.of(PROMOTIONS).delay(2000);
  // }
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('Promotions').getList();
  }

  // getPromotion(id: number): Observable<Promotion> {
  //   return Observable.of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).delay(2000);
  // }
  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  // getFeaturedPromotion(): Observable<Promotion> {
  //   return Observable.of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).delay(2000);
  // }
  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({ featured: true })
      .map(promotions => promotions[0]);
  }
}
