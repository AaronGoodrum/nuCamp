import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor() { }
  // -------------------------------
  // Simulating Time Delay within the Service
  // 6. Exercise (Instructions): Angular and Promise Part 2
  // 4. Exercise (Instructions): Angular and RxJS Part 1
  // -------------------------------
  
  getPromotions(): Promise<Promotion[]> {
    return Observable.of(PROMOTIONS).delay(2000).toPromise();

    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS), 2000)
    // return Promise.resolve(PROMOTIONS);
    // });
  }

  getPromotion(id: number): Promise<Promotion> {
 
    return Observable.of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).delay(2000).toPromise();
 
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000)
    // // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    // });
  }

  getFeaturedPromotion(): Promise<Promotion> {
 
    return Observable.of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).delay(2000).toPromise();
 
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000)
    // // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    // });
  }
}