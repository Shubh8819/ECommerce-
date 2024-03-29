import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartSatus } from 'src/app/common/cart-satus';
import { Product } from 'src/app/common/product';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  products:Product[]=[]
  currentCategoryId:number=1
   currentCategoryName: string = "";
   searchMode:boolean=false;
   previousCategoryId: number = 1;
   //new properties for pagination

   thePageNumber: number = 1;
   thePageSize: number = 10;
   theTotalElements: number = 0;
   
  
  constructor(private productService:ProductServiceService,
              private route:ActivatedRoute,private cartService:CartStatusService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProduct();
    })
  }
  listProduct() {
      this.searchMode=this.route.snapshot.paramMap.has('keyword')

      if(this.searchMode){
        this.hendleSearchList()
      }else{
        this.handleListProduct()
      }


   
  }
  hendleSearchList(){

    const keyword:string=this.route.snapshot.paramMap.get('keyword')!

    this.productService.searchProduct(keyword).subscribe(
      data=>{
        this.products=data;
      }
    )

  }

  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName=this.route.snapshot.paramMap.get('name')!
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName='Books'
    }
   // this.categoryId=+this.route.snapshot.paramMap.get('id')!;
   if (this.previousCategoryId != this.currentCategoryId) {
    this.thePageNumber = 1;
  }

  this.previousCategoryId = this.currentCategoryId;

  //console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

  // now get the products for the given category id
  this.productService.getProductListPaginate(this.thePageNumber - 1,
                                             this.thePageSize,
                                             this.currentCategoryId)
                                             .subscribe(
                                              data => {
                                                this.products = data._embedded.products;
                                                this.thePageNumber = data.page.number + 1;
                                                this.thePageSize = data.page.size;
                                                this.theTotalElements = data.page.totalElements;
                                              }                                     
                                             );
}
addTocard(theProduct:Product){
  console.log(theProduct.name+''+theProduct.unitPrice)
 // real work latter
 const theCartItem = new CartSatus(theProduct);

 this.cartService.addToCart(theCartItem);
}
}
