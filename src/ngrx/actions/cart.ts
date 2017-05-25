import {Action} from '@ngrx/store';
import {CHECKOUT_REQUEST} from '../reducers/cart';

export const checkout = (data) => {
    return <Action>{ type: CHECKOUT_REQUEST, payload: data };
}

