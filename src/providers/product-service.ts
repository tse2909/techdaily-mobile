import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
/*
  Generated class for the ImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('X-Requested-With', 'XMLHttpRequest');



@Injectable()
export class ProductService {
  
  rooturl = "https://techdaily-api.herokuapp.com";
    // rooturl = "http://localhost:8080";

  constructor(public http: Http) {
    console.log('Hello ImageService Provider');
    this.http = http;
  }

  getProduct() {
    return this.http.get(this.rooturl+"/getProducts",)
    .do((res: Response) => console.log(res))
    .map((res: Response) => res.json().body)
    .map((res) => JSON.parse(res))
  }

  postOrders(orders){
    console.log(orders);
    console.log( JSON.stringify(orders));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.rooturl+"/postOrders", orders, { headers:contentHeaders }).map(k => console.log(k))
  }
}
