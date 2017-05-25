import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getProductsAsArry, getCalculatedCartList } from '../../ngrx/reducers';
import { ProductAllPage } from '../../pages';
/*
  Generated class for the Brand page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html'
})
export class BrandPage {
cart: any;
products: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<any>) {
    this.products = store.let(getProductsAsArry());
    this.cart = this.store.let(getCalculatedCartList());
  }
  
    gotoProducts(filter) {
      let data = {
        type: 'TAGS',
        filter: filter
      }
        this.navCtrl.push(ProductAllPage, { data })
    }
}
