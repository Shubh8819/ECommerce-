import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl='http://localhost:8080/api/products'
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpclient:HttpClient) { }

  getProduuctList():Observable<Product[]>{
    return this.httpclient.get<GetResponseProduct>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  
  }
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}
interface GetResponseProduct{
  _embedded:{
    products:Product[]
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
