import { Storage } from '@ionic/storage';
import { favorite } from './../../shared/favorite';

import { Component, OnInit, Inject } from '@angular/core';
import {  NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: any[];
  errMess: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public storage: Storage,
    @Inject('BaseURL') public BaseURL,) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    console.log (this.favorites);

      let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ this.favorites[id].name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting . . .'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + this.favorites[id].name + ' deleted successfully',
              duration: 3000});
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
                errmess =>{ this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });

    alert.present();

    item.close();


  }

}
