import { Observable } from 'rxjs/Observable';
import { baseURL } from './../shared/baseurl';

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animation';

import { Feedback, ContactType } from '../shared/feedback';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  isOn = true;
  isOnPost = true;
  PostCopy = null;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) { this.createForm();  }

  ngOnInit() {
    this.isOn = true,
    this.isOnPost = true;
    this.http.get(this.BaseURL + 'feedback').subscribe(data => console.log(data));
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      // Angular Reactive Forms Part 3
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

  }

  onSubmit(feedbackForm) {
    this.isOn = false;
    setTimeout(() => { this.isOnPost = false; }, 2000);
    this.PostCopy = this.feedbackForm.value;
    this.http.post(this.BaseURL + 'feedback', {
      firstname: this.feedbackForm.value.firstname,
      lastname: this.feedbackForm.value.lastname,
      telnum: this.feedbackForm.value.telnum,
      email: this.feedbackForm.value.email,
      agree: this.feedbackForm.value.agree,
      contacttype: this.feedbackForm.value.contacttype,
      message: this.feedbackForm.value.message,
      date: new Date()
    })
    .subscribe(
      (data: any) => {
        this.PostCopy = data,
        console.log(data);
      } );
    setTimeout(() => {this.isOn = true, this.isOnPost = true; }, 5000 );

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
