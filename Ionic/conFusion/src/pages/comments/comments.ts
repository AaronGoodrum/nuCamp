import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DishdetailPage } from './../dishdetail/dishdetail';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comment: FormGroup;
  stars: number = 3
  myComment= '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
    ) {
    this.comment = this.formBuilder.group({
      author: ['', Validators.required],
      comment: ['', Validators.required],
      rating: 3,
      date: new Date().toISOString()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    console.log('view Dismiss');
  }

  onSubmit(){
    // console.log(this.comment.value);
    // pushing data from comment form to dishdetailPage
    let myComment = this.comment.value;
    this.viewCtrl.dismiss(myComment);
  }

}
