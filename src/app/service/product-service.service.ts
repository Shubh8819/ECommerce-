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
//for Product  find using Product CAtegory 
  getProduuctList(categoryId:number):Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpclient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  
  }
  getProductListPaginate(thePage: number, 
    thePageSize: number, 
    theCategoryId: number): Observable<GetResponseProduct> {

// need to build URL based on category id, page and size 
const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpclient.get<GetResponseProduct>(searchUrl);
}

  
  //for Product-category
  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
//search product with search name
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
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }

  
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
