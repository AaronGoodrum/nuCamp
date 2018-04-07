import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';

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

  getPromotions(): Observable<Promotion[]> {

    return Observable.of(PROMOTIONS).delay(2000);
  }

  getPromotion(id: number): Observable<Promotion> {

    return Observable.of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).delay(2000);
  }

  getFeaturedPromotion(): Observable<Promotion> {

    return Observable.of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).delay(2000);
  }
}
