import { NgModule } from '@angular/core';
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

const routes:Routes=[
  
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
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
   
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
