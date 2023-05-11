import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {NgxUiLoaderConfig,NgxUiLoaderModule,SPINNER} from 'ngx-ui-loader';
import { LoginComponent } from './login/login.component'
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { HighlightDirective } from './highlight.directive';
import { CustomerComponent } from './customer/customer.component';
import {MatCardModule} from '@angular/material/card';
import { AboutUsComponent } from './customer/about-us/about-us.component';
import { AnimationComponent } from './customer/animation/animation.component';
import { AddToCartComponent } from './customer/add-to-cart/add-to-cart.component';
import { CardDetailComponent } from './customer/card-detail/card-detail.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { GraphComponent } from './graph/graph.component';
import { CouponComponent } from './customer/coupon/coupon.component';


// import { MatCarouselModule } from '@ngmodule/material-carousel';


const ngxUiLoaderConfig:NgxUiLoaderConfig = {
  text:"Loding...",
  textColor:'#FFFFF',
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"#7b1fa2",
  fgsType:SPINNER.squareLoader,
  fgsSize:100,
  hasProgressBar:false
}
// const ngxUiLoaderConfig:

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    LoginComponent,
    HighlightDirective,
    CustomerComponent,
    AboutUsComponent,
    AnimationComponent,
    AddToCartComponent,
    CardDetailComponent,
    CheckoutComponent,
    CouponComponent,






   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatCardModule,




  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
