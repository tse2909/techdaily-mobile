import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/combineLatest'

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

import * as fromCart from './cart';
import * as fromProducts from './products';
import * as fromShipping from './shipping';

import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
export interface AppState {
    cart: fromCart.CartState;
    products: fromProducts.ProductsState;
    shipping: fromShipping.ShippingState;
}

const reducers = {
    cart: fromCart.cartReducer,
    products: fromProducts.productsReducer,
    shipping: fromShipping.shippingReducer
};

const developmentReducer: ActionReducer<AppState> = compose(
    storeFreeze,
    localStorageSync({ keys: ['products', 'cart', 'shipping'], rehydrate: true }),
    // storeLogger({
    // 	level: 'info',
    // 	collapsed: true,
    // }),
    combineReducers)(reducers);

const productionReducer: ActionReducer<AppState> = compose(
    localStorageSync({ keys: ['products', 'cart', 'shipping'], rehydrate: true }),
    combineReducers)(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}

export function getCartState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.cart);
}

export function getProductState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.products);
}

export function getShippingState() {
    return (state$: Observable<AppState>) => state$
        .select(s => s.shipping);
}

export function getProductEntities() {
    return compose(fromProducts.getProductEntities(), getProductState());
}

export function getProductsAsArry() {
    return compose(fromProducts.getProductsAsArry(), getProductState());
}


export function getShippingEntities() {
    return compose(fromShipping.getCityEntities(), getShippingState());
}

export function getCityAsArry() {
    return compose(fromShipping.getCityAsArry(), getShippingState());
}

// export function getProvince() {
//     return (state$: Observable<AppState>) => {
//         return state$.let(getCityAsArry())
//             .map((province:any[]) => {
//                 return {
//                     province_id: province,
//                     province_name: province[0].province,
//                 }
//             })
//     }
// }

export function getCalculatedCartList() {
    return (state$: Observable<AppState>) => {
        return Observable
            .combineLatest(state$.let(getCartState()), state$.let(getProductEntities()))
            .map(([cart, products]: any[]) => {
                return cart.productIds.map(productId => {
                    return {
                        id: productId,
                        title: products[productId].short_description,
                        brand: products[productId].tags[0].name,
                        image: products[productId].images[0].src,
                        price: products[productId].price,
                        quantity: cart.quantityById[productId]
                    };
                });
            });
    };
}


export function getCartCnt() {
    return (state$: Observable<AppState>) => {
        return state$.let(getCartState())
            .map((cart: any) => {
                return cart.productIds.map(productId => {
                    return {
                        quantity: cart.quantityById[productId]

                    };
                });
            });
    };
}

// export function getProductbyId(productId) {
//     return (state$: Observable<AppState>) => {
//         return state$.let(getProductState())
//             .map((products: any) => {
//                 return {
//                     id: products[productId].id,
//                     name: products[productId].name,
//                     category: products[productId].categories[0].name,
//                     image: products[productId].images[0].src,
//                     price: products[productId].price,
//                     description: products[productId].description,

//                 };
//             });
// };
// }
export function getProductbyId(productId) {
    return (state$: Observable<AppState>) => {
        return Observable
            .combineLatest(state$.let(getCartState()), state$.let(getProductEntities()))
            .map(([cart, products]: any[]) => {
                // return cart.productIds.map(productId => {
                return {
                    id: products[productId].id,
                    name: products[productId].name,
                    category: products[productId].tags[0].name,
                    image: products[productId].images[0].src,
                    price: products[productId].price,
                    description: products[productId].description,
                    quantity: cart.quantityById[productId] ? cart.quantityById[productId] : 1
                };
                // });
            });
    };
}
export function getProductWithCart(productId) {
    return (state$: Observable<AppState>) => {
        return Observable
            .combineLatest(state$.let(getCartState()), state$.let(getProductEntities()))
            .map(([cart, products]: any[]) => {
                // return cart.productIds.map(productId => {
                return {
                    id: products[productId].id,
                    name: products[productId].name,
                    category: products[productId].categories[0].name,
                    image: products[productId].images[0].src,
                    price: products[productId].price,
                    description: products[productId].description,
                    quantity: cart.quantityById[productId] ? cart.quantityById[productId] : 1
                };
                // });
            });
    };
}
