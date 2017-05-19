import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {


  rooturl = "https://techdaily-api.herokuapp.com";

  constructor(public http: Http) {
    console.log('Hello ImageService Provider');
    this.http = http;
  }

  getProduct() {

    // let url = this.rooturl + "'&$top=10";

    let headers = new Headers();

    return this.http.get(this.rooturl+"/getProducts",)
    .do((res: Response) => console.log(res))
    .map((res: Response) => res.json().body)
    .map((res) => JSON.parse(res))
    // .map((res: Response) => res.json())
      // .map(res => res.json())


  }
  
    getProductEffect() {

    // let url = this.rooturl + "'&$top=10";

    let headers = new Headers();

    return this.http.get(this.rooturl+"/getProducts",)
    .do((res: Response) => console.log(res))
    .map((res: Response) => res.json().body)
    .map((res) => JSON.parse(res))
    // .map((res: Response) => res.json())
      // .map(res => res.json())


  }

  postOrders(data){
    let headers = new Headers();
    return this.http.post(this.rooturl+"/postOrders", JSON.stringify(data), {headers:headers}).map(k => console.log(k))
  }
}
