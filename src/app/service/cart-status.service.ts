import { Injectable } from '@angular/core';
import { CartSatus } from '../common/cart-satus';
import { Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService {

  cartItem:CartSatus[]=[];

  //Subject is sub class of Observable we use to subcribe event in our code 
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();


  constructor() { }

  addToCart(theCartItem:CartSatus){
    // cheack the item in cart 
   // check if we already have the item in our cart
   let alreadyExistsInCart: boolean = false;
   
   let existingCartItem: CartSatus | undefined = undefined;

   if (this.cartItem.length > 0) {
     // find the item in the cart based on item id

     for (let tempCartItem of this.cartItem) {
       if (tempCartItem.id === theCartItem.id) {
         existingCartItem = tempCartItem;
         alreadyExistsInCart = true;
         break;
       }
     }
    // alreadyExistsInCart = existingCartItem !== undefined;
   }

   if (existingCartItem !== undefined) {
     // increment the quantity
     existingCartItem.quantity++;
   }
   else {
     // just add the item to the array
     this.cartItem.push(theCartItem);
   }

   // compute cart total price and total quantity
   this.computeCartTotals();
 }

 computeCartTotals() {

   let totalPriceValue: number = 0;
   let totalQuantityValue: number = 0;

   for (let currentCartItem of this.cartItem) {
     totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
     totalQuantityValue += currentCartItem.quantity;
   }

   // publish the new values ... all subscribers will receive the new data
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuanties(theCartItem:CartSatus){
      theCartItem.quantity--
      if(theCartItem.quantity==0){
       this.remove(theCartItem)
      }else{
        this.computeCartTotals()
      }
  }
  remove(theCartItem: CartSatus) {
    const index=this.cartItem.findIndex(tempcartItem=>tempcartItem.id===theCartItem.id);

    if(index>-1){
      this.cartItem.splice(index,1)
      this.computeCartTotals()
    }
  }
}
