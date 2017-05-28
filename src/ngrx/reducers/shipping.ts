import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


export const REQUEST_CITIES = 'REQUEST_CITIES';
export const RECEIVED_CITIES = 'RECEIVED_CITIES';


// export interface IProduct {
//     id: number;
//     title: string;
//     price: number;
//     inventory: number;
//     cart: number;
// }

export interface ShippingState {
    entities: { [id: string]: any };
}

const initialState: ShippingState = {
    entities: {}
};

export function shippingReducer(state = initialState, action: Action) {
    
    switch (action.type) {
        case RECEIVED_CITIES:
            return {
                entities: Object.assign({},
                    state.entities,
                    action.payload.reduce((obj, city) => {
                        obj[city.city_id] = city;
                        return obj;
                    }, {})
                )
            };

        default:
            return state;
    }
};

export function getCityEntities() {
    return (state$: Observable<ShippingState>) => state$
        .select(s => s.entities);
}

export function getCityAsArry() {
    return (state$: Observable<ShippingState>) => state$
        .let(getCityEntities())
        .map(res => Object.keys(res).map(key => res[key]));
}

