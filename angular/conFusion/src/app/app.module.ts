import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';

import 'hammerjs';

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHttpMsgService } from './services/process-httpmsg.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [DatePipe, DishService, PromotionService, LeaderService, { provide: 'BaseURL', useValue: baseURL }, ProcessHttpMsgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
