import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';

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





  constructor(private forBuilder:FormBuilder,private formService:FormService){}
  ngOnInit(): void {
   this.checkoutFormGroup=this.forBuilder.group({
    customer: this.forBuilder.group({
      firstName:[''],
      lastName:[''],
      email:['']
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
      cardNumber:[''],
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
  }
  
  onSubmit(){
    console.log("handing form")
    console.log(this.checkoutFormGroup.get('customer')?.value)
    console.log(this.checkoutFormGroup.get('shippingAdress')?.value)
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


}
