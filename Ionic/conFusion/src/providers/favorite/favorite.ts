import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'favoriteDishs';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(
    public http: Http,
    public storage: Storage,
    private dishservice: DishProvider
  ) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
      this.favoriteDISH(id);
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    this.unfavoriteDish(index)
    if (index >= 0) {
      this.favorites.splice(index,1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
  /////////
  isDishFavorite(dishID) {
    return this.getAllFavoriteDISH().then(result => {
      return result && result.indexOf(dishID) !== -1;
    });
  }

  favoriteDISH(dishID) {
    return this.getAllFavoriteDISH().then(result => {
      if (result) {
        result.push(dishID);
        console.log('Line 70', [dishID])
        return this.storage.set(STORAGE_KEY, result);
      } else {
        console.log('Line 73')
        return this.storage.set(STORAGE_KEY, [dishID]);
      }
    });
  }

  unfavoriteDish(dishID) {
    return this.getAllFavoriteDISH().then(result => {
      if (result) {
        var index = result.indexOf(dishID);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllFavoriteDISH() {
    console.log([STORAGE_KEY], 'line 90')
    return this.storage.get(STORAGE_KEY);
  }


}
