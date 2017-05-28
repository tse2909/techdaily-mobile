import { Action } from '@ngrx/store';
import { REQUEST_CITIES } from '../reducers/shipping';

export const getCities = () => {
    return <Action>{ type: REQUEST_CITIES };
}
