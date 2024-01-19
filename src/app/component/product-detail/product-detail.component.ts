import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product1!: Product

  constructor(private productService:ProductServiceService,private routes:ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductId: number = +this.routes.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product1 = data;
      }
    )
  }

}
