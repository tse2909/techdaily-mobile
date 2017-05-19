import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the ProductItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemComponent {
  addtoCartData : {id: string, qty: number};

  @Input() productDetail;
  text: string;
  
  @Output()
  addToCart: EventEmitter<any> = new EventEmitter<any>();

  quantities: number[] = [];
  quantity: number = 1;
  constructor() {
    console.log('Hello ProductItem Component');
    this.text = 'Hello World';

    for(let i = 1; i < 11; i ++){
      this.quantities.push(i);
    }
  }

  ngOnInit(){
      if(this.productDetail.quantity == 'null'){
      this.productDetail.quantity = 1;
    }
  }
  
  addtoCartClick(){
    var data = {id:this.productDetail.id, quantity: this.quantity}
    this.addToCart.emit(data);
}
}
