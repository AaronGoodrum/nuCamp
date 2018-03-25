import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

  constructor() { }
  // -------------------------------
  // Simulating Time Delay within the Service
  // -------------------------------
  
  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000)
    // return Promise.resolve(PROMOTIONS);
    });
  }

  getPromotion(id: number): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000)
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000)
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    });
  }
}