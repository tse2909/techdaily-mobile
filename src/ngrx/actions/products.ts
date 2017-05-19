
import {Action} from '@ngrx/store';
import {ADD_TO_CART, REQUEST_PRODUCTS, REMOVE_ITEM,UPDATE_ITEM, IProduct} from '../reducers/products';


export const getProducts = () => {
    return <Action>{ type: REQUEST_PRODUCTS };
}

export const addToCart = (product) => {
    return <Action>{ type: ADD_TO_CART, payload: product };
}

export const removeItem = (product) => {
    return <Action>{ type: REMOVE_ITEM, payload: product };
}

export const updateItem = (product) => {
    return <Action>{ type: UPDATE_ITEM, payload: {product:product.product, newQty:product.newQty} };
}
