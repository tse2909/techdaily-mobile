import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { getCalculatedCartList, getCartCnt } from '../../ngrx/reducers';
import { removeItem, updateItem } from '../../ngrx/actions/products';
import { CheckoutPage } from '../../pages';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  cart: any;
  actions$ = new Subject<Action>();

  cartState: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<any>, public loadingCtrl: LoadingController) {
    this.actions$.subscribe(store);
    this.cart = this.store.let(getCalculatedCartList());
    this.cartState = this.store.let(getCartCnt());
    console.log(this.cart);
    console.log(this.cartState);
  }

  ionViewDidLoad() {
  }

  deleteItem($event) {
    let loading = this.loadingCtrl.create({
      content: 'Deleting item ...'
    });
    loading.present();

    setTimeout(() => {
      this.actions$.next(removeItem($event));
      this.cart = this.store.let(getCalculatedCartList());
      loading.dismiss();
    }, 1000);
  }

  gotoCheckout(cart) {
    this.navCtrl.push(CheckoutPage, {cart})
  }

  changeQty($event){
    let loading = this.loadingCtrl.create({
      content: 'Updating item ...'
    });
    loading.present();

    setTimeout(() => {
      this.actions$.next(updateItem($event));
      this.cart = this.store.let(getCalculatedCartList());
      loading.dismiss();
    }, 1000);

  }

}
