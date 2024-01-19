import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit(): void {
  }
  doSearch(value:string){
    this.routes.navigateByUrl('/search/'+value)
  }

}
