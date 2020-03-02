import { SET_INITIALS } from "./action-types/cart-actions";


export function getData() {
    return function(dispatch) {
      return fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(json => {
          dispatch({ type: SET_INITIALS , payload: json });
        });
    };
  };