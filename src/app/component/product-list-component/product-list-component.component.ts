import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
  products:Product[]=[]
  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.listProduct();
  }
  listProduct() {
   this.productService.getProduuctList().subscribe(data=>{
    this.products=data;
   })
  }

}
