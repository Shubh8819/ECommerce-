import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartSatus } from 'src/app/common/cart-satus';
import { Product } from 'src/app/common/product';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  product1!: Product 

  constructor(private productService:ProductServiceService,private cardService:CartStatusService,
              private routes:ActivatedRoute) { }

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

  addTocard() {
    const cartItem=new CartSatus(this.product1)
    this.cardService.addToCart(cartItem)
    }
  

}
