import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';
import { CustomerComponent } from './customer/customer.component';
import { AddToCartComponent } from './customer/add-to-cart/add-to-cart.component';
import { CardDetailComponent } from './customer/card-detail/card-detail.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { CouponComponent } from './customer/coupon/coupon.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exploremore', component: CustomerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'addtocart', component: CardDetailComponent },
  { path: 'coupon', component: CouponComponent },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./material-component/material.module').then(
            (m) => m.MaterialComponentsModule
          ),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user',''],
        },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user',''],
        },
      },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
