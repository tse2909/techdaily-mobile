import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the ProductShow component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-show',
  templateUrl: 'product-show.html'
})
export class ProductShowComponent {
  @Input() brandProductList: any;

  @Output() gotoDetails = new EventEmitter<any>();
  text: string;

  constructor() {
    console.log('Hello ProductShow Component');
    this.text = 'Hello World';
  }

  ngOninit(){
    console.log(this.brandProductList)
  }

}
