import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';

const STORAGE_KEY: Array < string > =[];

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

  }

  favoriteDISH(dishID) {
     if(dishID==null) return;
     this.favorites = ['dishID', dishID]
    this.storage.set('STORAGE_KEY', JSON.stringify(this.favorites))
  }

  unfavoriteDish(dishID) {
    // return this.getAllFavoriteDISH().then(result => {
    //   if (result) {
    //     var index = result.indexOf(dishID);
    //     result.splice(index, 1);
    //     return this.storage.set(STORAGE_KEY[dishID], result);
    //   }
    // });
  }

  getAllFavoriteDISH() {
    // return this.storage.get('STORAGE_KEY').then((res) =>{
    //   console.log(res);
  }

}
