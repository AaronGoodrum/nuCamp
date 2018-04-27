import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
      dateTime: new Date().toISOString()
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
    console.log(this.comment.value);
    this.dismiss();
  }

}
