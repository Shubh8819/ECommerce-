import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponentComponent } from './component/product-list-component/product-list-component.component';
import {HttpClientModule} from '@angular/common/http'
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './component/product-category/product-category.component';

const routes:Routes=[
  { path: 'products', component: ProductListComponentComponent },
  // {path: 'category', component: ProductListComponentComponent},
  {path: 'category/:id', component: ProductCategoryComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponentComponent,
    ProductCategoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
