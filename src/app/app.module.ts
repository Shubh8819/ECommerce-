import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponentComponent } from './component/product-list-component/product-list-component.component';
import {HttpClientModule} from '@angular/common/http'
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CardDetailComponent } from './component/card-detail/card-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogninComponent } from './component/lognin/lognin.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, 
  OktaAuthGuard
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';


import myAppConfig from './config/my-config';
import { MemberPageComponent } from './component/member-page/member-page.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}


const routes:Routes=[
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LogninComponent},
  {path: 'members', component: MemberPageComponent, canActivate: [OktaAuthGuard],
                    data: {onAuthRequired: sendToLoginPage} },
  
  {path: 'category', component: ProductListComponentComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'category/:id/:name', component: ProductListComponentComponent},
  {path: 'products', component: ProductListComponentComponent},
  {path:'search/:keyword' , component: ProductListComponentComponent},
  {path:'search/:keyword' , component: ProductListComponentComponent},
  {path:'card-detail' , component: CardDetailComponent},
  

  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponentComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailComponent,
    CartStatusComponent,
    CardDetailComponent,
    CheckoutComponent,
    LogninComponent,
    LoginStatusComponent,
    MemberPageComponent
   
    
   
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
   
  

  ],
  providers: [{provide : OKTA_CONFIG,useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
