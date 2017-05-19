import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVED_PRODUCTS = 'RECEIVED_PRODUCTS';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export interface IProduct {
    id: number;
    title: string;
    price: number;
    inventory: number;
    cart: number;
}

export interface ProductsState {
    entities: { [id: string]: IProduct };
}

const initialState: ProductsState = {
    entities: {}
};

export function productsReducer(state = initialState, action: Action) {
    
    switch (action.type) {
        case RECEIVED_PRODUCTS:
            return {
                entities: Object.assign({},
                    state.entities,
                    action.payload.reduce((obj, product) => {
                        obj[product.id] = product;
                        return obj;
                    }, {})
                )
            };
        case ADD_TO_CART:
            return {
                entities: Object.assign({}, state.entities, {
                    [action.payload.id]: Object.assign({}, state.entities[action.payload.id]
                    // , {inventory: state.entities[action.payload].inventory - 1}
                    // , {cart: state.entities[action.payload].cart? state.entities[action.payload].cart : 0 + 1}
                    )
                })
            };


        default:
            return state;
    }
};

export function getProductEntities() {
    return (state$: Observable<ProductsState>) => state$
        .select(s => s.entities);
}

export function getProductsAsArry() {
    return (state$: Observable<ProductsState>) => state$
        .let(getProductEntities())
        .map(res => Object.keys(res).map(key => res[key]));
}

