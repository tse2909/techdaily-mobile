import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the CartButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'cart-button',
  templateUrl: 'cart-button.html'
})
export class CartButtonComponent {
  @Input() cart;

  @Output() gotoCarts = new EventEmitter<any>();

  text: string;
  cartCount: number = 0;
  constructor() {
    console.log('Hello CartButton Component');
    this.text = 'Hello World';
  }


  ngOnInit() {
    console.log(this.cart);
    if (this.cart == undefined) {
      this.cartCount = 0;
    } else {
      this.cartCount = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartCount += Number(this.cart[i].quantity);

      }
    }


  }

  ngOnChanges() {
    console.log(this.cart);
    if (this.cart == undefined) {
      this.cartCount = 0;
    } else {
      this.cartCount = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartCount += Number(this.cart[i].quantity);

      }
    }

  }
}
