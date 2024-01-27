import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  

  
  constructor() { }

  getCraditCardMonth(startmonth:number) :Observable<number[]>{
    let data:number[]=[];

    for (let themonth = startmonth; themonth <=12; themonth++) {
      data.push(themonth);
      
    }
    return of(data)
  }

  getCraditCardYear() :Observable<number[]>{
    let data:number[]=[];

    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10

    for (let theyear = startYear; theyear < endYear; theyear++) {
      data.push(theyear);
      
    }
    return of(data)
  }
  


}
