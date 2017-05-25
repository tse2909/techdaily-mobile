import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import {getProducts, addToCart} from '../../ngrx/actions/products';
import { Subject } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getProductsAsArry } from '../../ngrx/reducers';
import { ProductDetailPage } from '../../pages';
import 'rxjs/add/operator/filter';
/*
  Generated class for the ProductShow page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-all',
  templateUrl: 'product-all.html'
})
export class ProductAllPage {

  data;
  brandProducts;
  brandProductList;

  sortedData;
  searchTerm: string = '';
  products: Observable<any[]>;
  actions$ = new Subject<Action>();
  constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<any>) {
    this.data = this.navParams.get('data');
    console.log(this.data);
    this.products = store.let(getProductsAsArry());
    console.log(this.products);
    console.log(this.data.type);
    this.products.subscribe(k => this.brandProducts = k);
    if (this.data.type === 'ALL') {
      if (this.data.filter === 'HOT') {
        this.brandProductList = this.brandProducts.sort(function (a, b) {
          return b.total_sales - a.total_sales
        })
        this.sortedData = this.brandProductList;
      } else if (this.data.filter === 'NEW') {
        this.brandProductList = this.brandProducts.sort(function (a, b) {
          return b.id - a.id
        })
        this.sortedData = this.brandProductList;
      } else if (this.data.filter === 'SALE') {
        this.brandProductList = this.brandProducts.filter(k => k.on_sale !== false)
        this.sortedData = this.brandProductList;
      }
    } else if (this.data.type === 'TAGS') {
      this.brandProductList = this.brandProducts.filter(item =>
        item.tags.length ? item.tags[0].name.toUpperCase() === this.data.filter.toUpperCase() : '' === this.data.filter.toUpperCase());
      console.log(this.brandProductList);
      this.sortedData = this.brandProductList;

    } else if (this.data.type === 'CATEGORIES') {
      this.brandProductList = this.brandProducts.filter(item =>
        item.categories[0].name.toUpperCase() === this.data.filter.toUpperCase());
      console.log(this.brandProductList);
      this.sortedData = this.brandProductList;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductShowPage');
  }

  gotoDetails(product) {
    this.navCtrl.push(ProductDetailPage, { product });
  }

  setFilteredItems() {
    var products = this.brandProductList;
    this.brandProductList = this.sortedData.filter(k => k.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
    console.log(this.brandProductList);
  }
}
