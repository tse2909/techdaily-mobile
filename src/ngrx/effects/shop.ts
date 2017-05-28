import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import 'rxjs';

import {REQUEST_PRODUCTS, RECEIVED_PRODUCTS} from '../reducers/products';
import {CHECKOUT_REQUEST, CHECKOUT_SUCCESS} from '../reducers/cart';
import { REQUEST_CITIES, RECEIVED_CITIES } from '../reducers/shipping';
// import * as shop from '../api/shop';
import { ProductService } from '../../providers/product-service';
import { HomePage } from '../../pages';
@Injectable()
export class ShopEffects {

    constructor(
        private _productService: ProductService,
        private _actions$: Actions,
        private _store: Store<any>,
        private app: App) {
        this._productService.getProduct().map(res => console.log(res))
    }

    @Effect()
    load$ = this._actions$
        .ofType(REQUEST_PRODUCTS)
        .map(action => JSON.stringify(action.payload))
        .switchMap(() => this._productService.getProduct())
        .map(res => {
            return {
                type: RECEIVED_PRODUCTS,
                payload: res
            };
        });

    @Effect()
    checkout$ = this._actions$
        .ofType(CHECKOUT_REQUEST)
        .map(action => JSON.stringify(action.payload))
        .switchMap((data) => this._productService.postOrders(data))
        .map(res => {
            return {
                type: CHECKOUT_SUCCESS,
                payload: res
            };

        })
        .do(() => {
            this.app.getActiveNav().setRoot(HomePage);
        });

    @Effect()
    loadCity$ = this._actions$
        .ofType(REQUEST_CITIES)
        .map(action => JSON.stringify(action.payload))
        .switchMap(() => this._productService.getCities())
        .map(res => {
            return {
                type: RECEIVED_CITIES,
                payload: res
            };
        });
}