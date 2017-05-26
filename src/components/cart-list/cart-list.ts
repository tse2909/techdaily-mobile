import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

/*
  Generated class for the CartList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'cart-list',
  templateUrl: 'cart-list.html'
})
export class CartListComponent implements OnChanges {
  @Input() cart;
  @Input() cartState;

  @Output() deleteItem = new EventEmitter<any>();
  @Output() gotoCheckout = new EventEmitter<any>();
  @Output() changeQty = new EventEmitter<any>();
  
  cartCount: number = 0;
  cartTotal: number = 0;

  constructor() {
  }

  ngOnInit() {
    console.log(this.cart);
    if (this.cart == undefined) {
      this.cartCount = 0;
    } else {
      this.cartCount = 0;
      this.cartTotal = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartCount += Number(this.cart[i].quantity);
        this.cartTotal += this.cart[i].quantity * this.cart[i].price
        console.log(this.cartTotal);
      }
    }
  }

  ngOnChanges(){
     console.log(this.cart);
    if (this.cart == undefined) {
      this.cartCount = 0;
    } else {
      this.cartCount = 0;
      this.cartTotal = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartCount += Number(this.cart[i].quantity);
        this.cartTotal += this.cart[i].quantity * this.cart[i].price
        console.log(this.cartTotal);
      }
    }
  }
}