import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentsPage } from './../comments/comments';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('BaseURL') public BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public actionsheetCtrl: ActionSheetController
  ) {
      this.dish = navParams.get('dish');
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total / this.numcomments).toFixed(2);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
    let myComment = this.navParams.get('myComment');
    console.log(myComment);
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.name + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  openComments() {
    let modal = this.modalCtrl.create(CommentsPage);
    modal.onDidDismiss((myComment) => {
      if (myComment){
      this.dish.comments.push(myComment);
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total / this.numcomments).toFixed(2);
      }
      })
    modal.present();
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Actions',
      cssClass: 'action-sheets-groups-page',
      buttons: [
        {
          text: 'Add to Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          icon: !this.platform.is('ios') ? 'text' : null,
          handler: () => {
            this.openComments();
            console.log('Comment clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
