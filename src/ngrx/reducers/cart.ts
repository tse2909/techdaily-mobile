import { Action } from '@ngrx/store';
import { ADD_TO_CART } from './products';
import { REMOVE_ITEM } from './products';
import { UPDATE_ITEM } from './products';
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'


export interface CartState {
    productIds: any[];
    quantityById: any;
}

const initialState: CartState = {
    productIds: [], quantityById: {}
}

export function cartReducer(state = initialState, action: Action): CartState {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.productIds.indexOf(action.payload.id) !== -1) {
                return Object.assign({},
                    state,
                    {
                        quantityById:
                        Object.assign({}, state.quantityById,
                            { [action.payload.id]: (state.quantityById[action.payload.id] || 0) + Number(action.payload.quantity) }
                        )
                    }
                );
            }
            return Object.assign({},
                state,
                {
                    productIds: [...state.productIds, action.payload.id],
                    quantityById:
                    Object.assign({}, state.quantityById,
                        { [action.payload.id]: (state.quantityById[action.payload.id] || 0) + + Number(action.payload.quantity) }
                    )
                }
            );
        case REMOVE_ITEM:
            return Object.assign({},
                state,
                {
                    productIds: state.productIds.filter(id => id !== action.payload.id),
                    quantityById: Object.assign({}, state.quantityById, { [action.payload.id]: 0 })
                });

        case UPDATE_ITEM:
            return Object.assign({},
                    state,
                    {
                        quantityById:
                        Object.assign({}, state.quantityById,
                            { [action.payload.product.id]: Number(action.payload.newQty) }
                        )
                    }
                );

        case CHECKOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};