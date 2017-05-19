import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../providers/product-service';
/*
  Generated class for the CheckoutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

interface prod {
  product_id: number;
  quantity: number
}

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})



export class CheckoutPage {
  cart;
  cartCount;
  cartTotal;
  line_items: prod[] = [];
  shipping;
  billing;
  data;

  checkoutForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private _productService: ProductService) {
    this.checkoutForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      address1: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      address2: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      state: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      postal: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      country: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });





    this.cart = this.navParams.get('cart');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPagePage');
  }

  Checkout() {


    for (let i = 0; i < this.cart.length; i++) {
      this.line_items.push({
        product_id: this.cart[i].id,
        quantity: this.cart[i].quantity
      })
    }
    this.billing = this.checkoutForm.value;
    this.shipping = this.checkoutForm.value;



    console.log(this.checkoutForm.value);
    console.log(this.line_items);
    this.data = Object.assign({ billing: this.billing }, { shipping: this.shipping }, { line_item: this.line_items });
    console.log(this.data);
    console.log(JSON.stringify(this.data));
  }

}
