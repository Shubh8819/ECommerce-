import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
   private stateUrl:string='http://localhost:8080/api/states';
   private countryUrl:string='http://localhost:8080/api/countries'

  
  constructor(private httpClient:HttpClient) { }

  getCountry():Observable<Country[]>{
    return this.httpClient.get<GetResponceContry>(this.countryUrl).pipe(
      map(responce=>responce._embedded.countries)
    )
  }
  getState(countrycode:string):Observable<State[]>{
    const searchStateUrl='http://localhost:8080/api/states/search/findByCountryCode?code='+countrycode

    return this.httpClient.get<GetResponceState>(searchStateUrl).pipe(
      map(responce=>responce._embedded.states)
    )

  }

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
interface GetResponceContry{
  _embedded:{
    countries:Country[]
  }
}
interface GetResponceState{
  _embedded:{
    states:State[]
  }
}
