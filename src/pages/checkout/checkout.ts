import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { Action, Store } from '@ngrx/store';

import { checkout } from '../../ngrx/actions/cart';
import { getCityAsArry } from '../../ngrx/reducers';
import { CartPage } from '../../pages';
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
  action$ = new Subject<Action>();
  checkoutAction = checkout;
  cart;
  cartCount;
  cartTotal;
  total;
  line_items: prod[] = [];
  shipping_lines = [];
  shipping;
  billing;
  data;
  shippingCost: any = "Fill address form";
  submitAttempt = false;
  checkoutForm: FormGroup;
  provinces;
  cities;
  // citiesArray;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public formBuilder: FormBuilder, 
  private store: Store<any>, 
  private loadingCtrl: LoadingController,
  private _service: ProductService) {
    this.action$.subscribe(store);
    // this.cities = this.store.let(getCityAsArry());
    // this.cities.subscribe(cities => {this.citiesArray = cities; console.log(this.citiesArray)});
    this._service.getProvinces().subscribe(k => {this.provinces = k; console.log(k)});
    this.checkoutForm = formBuilder.group({
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      address_1: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      address_2: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      state: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      postcode: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
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
        this.cartTotal += this.cart[i].quantity * this.cart[i].price;
        this.total = this.cartTotal;
        console.log(this.cartTotal);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPagePage');
  }
  gotoCart() {
    this.navCtrl.push(CartPage, {})
  }

  provinceSelected($event){
    console.log($event);
    this._service.getCity($event).subscribe(c => {this.cities = c; console.log(this.cities)});
  }

  citySelected($event){
    console.log($event);


    this.shippingCost = 36000;
    this.cartCount = 0;
      this.cartTotal = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.cartTotal += this.cart[i].quantity * this.cart[i].price;
      }
      this.total = this.cartTotal + 36000;


    
  }

  Checkout() {
    this.submitAttempt = true;
    if (!this.checkoutForm.valid) {

    } else {
      let loading = this.loadingCtrl.create({
        content: 'Deleting item ...'
      });
      loading.present();
      setTimeout(function () {
        loading.dismiss();
      }, 1500);
      for (let i = 0; i < this.cart.length; i++) {
        this.line_items.push({
          product_id: this.cart[i].id,
          quantity: this.cart[i].quantity
        })
      }
      this.shipping_lines.push({
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: 10
      })
      this.billing = this.checkoutForm.value;
      this.shipping = this.checkoutForm.value;

      console.log(this.checkoutForm.value);
      console.log(this.line_items);
      this.data = Object.assign({ payment_method: 'bacs' }, { payment_method_title: 'Direct Bank Transfer' }, { set_paid: true }, { billing: this.billing }, { shipping: this.shipping }, { line_items: this.line_items });
      var orders = {
        data: this.data
      };
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      this.action$.next(this.checkoutAction(orders));
    }
  }

}
