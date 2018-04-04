import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;
  errMess: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    // 4. Exercise (Instructions): Angular and Promise Part 1
    // 4. Exercise (Instructions): Angular and RxJS Part 1
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
