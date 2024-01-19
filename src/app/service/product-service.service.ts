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

  getProduuctList(categoryId:number):Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpclient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  
  }
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProduct(keyword: string):Observable<Product[]> {
    const searchUrl='http://localhost:8080/api/products/search/findByNameContaining?name='+keyword
    return this.httpclient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products))
  }

  getProduct(theproductId: number):Observable<Product> {
    const productidUrl=this.baseUrl+'/'+theproductId
    return this.httpclient.get<Product>(productidUrl)
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
