import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { CartSatus } from 'src/app/common/cart-satus';
import { CartStatusService } from 'src/app/service/cart-status.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent  implements OnInit{


  cartItem :CartSatus[]=[];
  totalPrice:number=0;
  totalqantity:number=0;

  constructor(private cartService:CartStatusService){

  }
  ngOnInit(): void {
    this.listCartItem();
  }
  listCartItem(){

    this.cartItem=this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data);

    this.cartService.totalQuantity.subscribe(data =>
      this.totalqantity=data)

      this.cartService.computeCartTotals();

  
  }
  incrementQuantity(theCartItem: CartSatus) {
    this.cartService.addToCart(theCartItem)
  }

  decrementQuantity(theCartItem:CartSatus){
   
    this.cartService.decrementQuanties(theCartItem)
  }

  remove(tempCartItem:CartSatus){
    this.cartService.remove(tempCartItem)
  }
   
    
  
  
}
