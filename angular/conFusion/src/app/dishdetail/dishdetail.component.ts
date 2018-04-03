import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdSliderModule } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

import { MenuComponent } from './../menu/menu.component';

import { Dish } from './../shared/dish';
// import { DISHES } from './../shared/dishes';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

    // 4. Exercise (Instructions): Angular and Promise Part 1
    // 4. Exercise (Instructions): Angular and RxJS Part 1
    // 4. Exercise (Instructions): Angular and RxJS Part 2
    // Assignment Week 3 Task 1-2-3
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  dishcopy = null;

  prev: number;
  next: number;
  CommentRating: number;
  date: string;
  comment: string;
  dishErrMess: string;

  commentFeedForm: FormGroup;
  commentForm = Comment;
  formErrors = {
    'author': '',
    'comment': '',
    'rating': '',
    'date': ''
  };

  validationMessages = {
    'author': {
      'required': 'Auther Name is required.',
      'minlength': 'Auther Name must be at least 2 characters long.',
      'maxlength': 'Auther Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'comment is required.',
      'minlength': 'comment must be at least 2 characters long.',
      'maxlength': 'comment cannot be more than 255 characters long.'
    }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) { this.createForm(); }


  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id); },
      dishErrMess => this.dish = null, this.dishErrMess = <any>this.dishErrMess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentFeedForm = this.fb.group({
      // Angular Reactive Forms Part 3
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      rating: [5],
      date: []
    });

    this.commentFeedForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    // Week 3 Assignment Task 3
    // So painful, to do this right.
    const commentFeedForm = this.commentFeedForm = this.fb.group({
      author: this.commentFeedForm.value.author,
      comment: this.commentFeedForm.value.comment,
      rating: this.commentFeedForm.value.rating,
      date: new Date()
    });
    // this.commentForm = this.commentFeedForm.value;
    // console.log(this.commentForm);
    console.log(commentFeedForm.value);
    this.dish.comments.push(commentFeedForm.value );
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    this.commentFeedForm.reset({
      author: '',
      comment: '',
      rating: 5,
      date: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentFeedForm) { return; }
    const form = this.commentFeedForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
