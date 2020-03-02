
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,SET_INITIALS} from './action-types/cart-actions'

export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}

export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}

export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}

export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}

export const setInitials = ()=>{
    return{
        type: SET_INITIALS
    }
}
