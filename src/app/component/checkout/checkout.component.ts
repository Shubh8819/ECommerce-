import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

 




  constructor(private forBuilder:FormBuilder,private formService:FormService){}
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
