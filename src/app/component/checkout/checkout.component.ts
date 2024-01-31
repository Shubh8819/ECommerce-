import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { CartStatusService } from 'src/app/service/cart-status.service';
import { FormService } from 'src/app/service/form.service';
import { ValidatorsCustom } from 'src/app/validation/validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!:FormGroup 
  totalPrice: number = 0;
  totalQuantity: number = 0;

  //craditCart
  craditCardMonth:number[]=[];
  craditcartYear:number[]=[]
  //contry
  countries:Country[]=[];
  billingadressState:State[]=[]
  shippingAddressState:State[]=[]
  

 




  constructor(private forBuilder:FormBuilder,private formService:FormService,private cartDetailService:CartStatusService,private checkoutService:CartServiceService,private router: Router){}
  ngOnInit(): void {
   this.checkoutFormGroup=this.forBuilder.group({
    customer: this.forBuilder.group({
      firstName:new FormControl('',[Validators.required, 
        Validators.minLength(2), 
        ValidatorsCustom.notOnlyWhitespace]),

      lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
      email:new FormControl('',[Validators.required,
                                  Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
    }),
    shippingAddress: this.forBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']
    }),
    billingAddress: this.forBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:['']
    }),
    creditCard: this.forBuilder.group({
      cardType:[''],
      nameOnCard:[''],
      cardNumber:new FormControl('',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]),
      securityCode:[''],
      expirationMonth:[''],
      expirationYear:['']
    }),

   
   })
   //populate cradidCard 

   const startmonth:number=new Date().getMonth()+1;
   this.formService.getCraditCardMonth(startmonth).subscribe(data=>{
    this.craditCardMonth=data
   })

   
   this.formService.getCraditCardYear().subscribe(data=>{
    this.craditcartYear=data
   })

   this.formService.getCountry().subscribe(data=>{this.countries=data})

   
   this.reviewCart();

   
  }

  getState(formGroupName:string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.formService.getState(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressState = data; 
        }
        else {
          this.billingadressState = data;
        }

        // select first item by default
        //formGroup.get('state').setValue(data[0]);


      })
  }
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email')
  }
  get cardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  onSubmit(){
    console.log("handing form")
    console.log(this.checkoutFormGroup.get('customer')?.value)
    console.log(this.checkoutFormGroup.get('shippingAdress')?.value)
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }


     // set up order
     let order = new Order(this.totalQuantity, this.totalPrice);

     // get cart items
     const cartItems = this.cartDetailService.cartItem;
 
     // create orderItems from cartItems
     // - long way
     
    //  let orderItems: OrderItem[] = [];
    //  for (let i=0; i < cartItems.length; i++) {
    //    orderItems[i] = new OrderItem(cartItems[i])
    //  }
     
 
     // - short way of doing the same thingy
     let orderItems: OrderItem[] = cartItems.map(tempCartItem => 
                                new OrderItem(tempCartItem.imageUrl!,
                                   tempCartItem.unitPrice!, tempCartItem.quantity, tempCartItem.id));
 
     // set up purchase
     let purchase = new Purchase();
     
     // populate purchase - customer
     purchase.customer = this.checkoutFormGroup.controls['customer'].value;
     
     // populate purchase - shipping address
     purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
     const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
     const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
     purchase.shippingAddress.state = shippingState.name;
     purchase.shippingAddress.country = shippingCountry.name;
 
     // populate purchase - billing address
     purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
     const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
     const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
     purchase.billingAddress.state = billingState.name;
     purchase.billingAddress.country = billingCountry.name;
   
     // populate purchase - order and orderItems
     purchase.order = order;
     purchase.orderItems = orderItems;
 
     // call REST API via the CheckoutService
     this.checkoutService.placeOrder(purchase).subscribe({
         next: response => {
           alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
 
           // reset cart
           this.resetCart();
 
         },
         error: err => {
           alert(`There was an error: ${err.message}`);
         }
       }
     );
  }

  resetCart() {
    // reset cart data
    this.cartDetailService.cartItem = [];
    this.cartDetailService.totalPrice.next(0);
    this.cartDetailService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonth(){
    const checkoutFormGroup=this.checkoutFormGroup.get('creditCard')

    const selectYear:number=Number (checkoutFormGroup?.value.expirationYear);
    const currentYear=new Date().getFullYear();
    let startmonth:number
    if(selectYear===currentYear){
      startmonth=new Date().getMonth()+1
    }else{
      startmonth=1
    }

    this.formService.getCraditCardMonth(startmonth).subscribe(data=>{
      this.craditCardMonth=data;
    })
  
  }

  reviewCart(){
    this.cartDetailService.totalPrice.subscribe(data=>{
      this.totalPrice=data;
    })
    this.cartDetailService.totalQuantity.subscribe(data=>{
      this.totalQuantity=data;
    })
    this.cartDetailService.computeCartTotals()
  }



}
