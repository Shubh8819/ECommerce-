import { Product } from "./product";

export class CartSatus {
         id: number;
         name:string;
         imageUrl: string;
         unitPrice: number;
         quantity: number = 1
  
    constructor(product:Product){
        this.id=product.id
        this.name=product.name
        this.imageUrl=product.imageUrl
        this.quantity=1
        this.unitPrice=product.unitPrice
    }
   
}
