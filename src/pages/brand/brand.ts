import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {getProductsAsArry} from '../../ngrx/reducers';
import {Store, Action} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProductAllPage } from '../product-all/product-all';
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
products: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<any>) {
    this.products = store.let(getProductsAsArry());
  }
  
    gotoProducts(filter) {
      let data = {
        type: 'TAGS',
        filter: filter
      }
        this.navCtrl.push(ProductAllPage, { data })
    }

}
