import { Injectable } from '@angular/core';
import { CartSatus } from '../common/cart-satus';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartStatusService {

  cartItem:CartSatus[]=[];
  storage:Storage=localStorage

  //Subject is sub class of Observable we use to subcribe event in our code 
  totalPrice:Subject<number>=new BehaviorSubject<number>(0);
  totalQuantity:Subject<number>=new BehaviorSubject<number>(0);


  constructor() { 
    //set the data in local storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItem = data;
      this.computeCartTotals();
    }
      
      // compute totals based on the data that is read from storage
      
  }
 //get the data form storage 
  pursistCartItem(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItem))
  }

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

   this.pursistCartItem()
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
