import { Component} from '@angular/core';
import { NavController, NavParams, App, LoadingController, ToastController  } from 'ionic-angular';
import {getProducts, addToCart} from '../../ngrx/actions/products';
import {getProductsAsArry, getCalculatedCartList, getProductWithCart} from '../../ngrx/reducers';
import { Subject } from 'rxjs';
import {Store, Action} from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
  public wobbleState: string;
  productDetail: any;
  cart: any;
  products: Observable<any[]>;
  actions$ = new Subject<Action>();
  addToCartAction = addToCart;
  public product;
  public productId;
  qty: number = 1;


  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public store: Store<any>, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.products = store.let(getProductsAsArry());
    console.log(this.products);
    this.cart = store.let(getCalculatedCartList());

    this.actions$.subscribe(store);
    this.actions$.next(getProducts());

    this.product = this.navParams.get('product');
    this.productId = this.product.id;
    console.log(this.productId);
    console.log(this.product);
    this.productDetail = store.let(getProductWithCart(this.productId));
    console.log(this.productDetail);
  }

  addToCartOutput($event) {
    let loading = this.loadingCtrl.create({
      content: 'Add to cart...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();

      this.actions$.next(this.addToCartAction($event));
      this.cart = this.store.let(getCalculatedCartList());

        let toast = this.toastCtrl.create({
          message: 'Item was added successfully',
          duration: 1000
        });
        toast.present();
      
    }, 300);
  }

  ionViewDidLoad() {
    this.app.setTitle(this.product.name);
    console.log('ionViewDidLoad ProductDetailPage');
  }


}
