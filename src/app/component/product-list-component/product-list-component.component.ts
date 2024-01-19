import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  products:Product[]=[]
   categoryId:number=1
   currentCategoryName: string = "";
   searchMode:boolean=false;
  
  constructor(private productService:ProductServiceService,private route:ActivatedRoute) { }

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
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName=this.route.snapshot.paramMap.get('name')!
    }
    else {
      // not category id available ... default to category id 1
      this.categoryId = 1;
      this.currentCategoryName='Books'
    }
   // this.categoryId=+this.route.snapshot.paramMap.get('id')!;
   this.productService.getProduuctList(this.categoryId).subscribe(data=>{
    this.products=data;
   })
  }
}
