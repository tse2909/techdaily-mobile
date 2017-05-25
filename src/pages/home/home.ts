import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { getProductsAsArry, getCalculatedCartList } from '../../ngrx/reducers';
import { getProducts } from '../../ngrx/actions/products';
import { ProductService } from '../../providers/product-service';
import { ProductAllPage, ProductDetailPage, CartPage } from '../../pages';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    products: Observable<any[]>;
    actions$ = new Subject<Action>();
    cart: any;
    constructor(public navCtrl: NavController, public store: Store<any>) {
        this.actions$.subscribe(store);
        this.actions$.next(getProducts());
        this.cart = this.store.let(getCalculatedCartList());
        this.products = this.store.let(getProductsAsArry())
        this.products.subscribe(k => console.log(k))
    }

    gotoDetails(product) {
        this.navCtrl.push(ProductDetailPage, { product })
    }

    gotoProducts(filter) {
        let data = {
            type: 'ALL',
            filter: filter
        }
        this.navCtrl.push(ProductAllPage, { data })
    }

    gotoProductsCategory(filter) {
        let data = {
            type: 'CATEGORIES',
            filter: filter
        }
        this.navCtrl.push(ProductAllPage, { data })
    }

    gotoCarts() {
        this.navCtrl.push(CartPage, {})
    }

}
