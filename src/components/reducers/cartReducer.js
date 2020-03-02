import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    SET_INITIALS
} from '../actions/action-types/cart-actions'

const initState = {
    items: [],
    addedItems:[],
    totalAtCart: 0,
    total: 0,
    theme: {},
    classes: {}
}

const cartReducer = function(state = initState, action) {
    if (action.type === ADD_TO_CART) {
        //Pega o estoque atual
        let newItems = state.items;
        //Acha o produto da ação no estoque atual
        let ind = newItems.map(e => e.id).indexOf(action.id);
        
        //Se não tiver produtos em estoque ejeta
        if(newItems[ind].quantity < 1) return;

        //Calula o novo total de produtos do carrinho
        state.totalAtCart += 1;

        //atribui o novo total do carro a constante
        let newTotalAtCart = state.totalAtCart;

        //Achao o produto a ser adicionado ao carrinho
        let addedItem = state.items.find(item => item.id === action.id)
        //Verifica se o produto já esta no carrinho
        let existed_item = state.addedItems.find(item => action.id === item.id)
        
        if( !addedItem.quantityInCart) addedItem.quantityInCart = 0
        addedItem.quantityInCart += 1
        
        //Se houver adiciona ao carrinho, ou apenas devolve o carrinho como está
        let itemToAdd= existed_item ? [...state.addedItems] : [...state.addedItems, addedItem]; 

        //Calcula o novo estoque após a operação
        let stock = newItems[ind].quantity - 1;

        //atribui o novo total em estoque
        newItems[ind].quantity = stock;

        return {
            ...state,
            items: newItems,
            addedItems: itemToAdd,
            total: state.total + addedItem.price,
            totalAtCart: newTotalAtCart
        }
    }

    if (action.type === REMOVE_ITEM) {
        //Acha o produto da ação no estoque atual
        let actualItem = state.items.find(item => action.id === item.id);
 
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //Devolve ao estoque tudo que foi retirado d ocarrinho
        let stockDevolution = actualItem.quantity + itemToRemove.quantityInCart ;
        //atribui a nova quantidade de produto
        actualItem.quantity = stockDevolution;
        state.totalAtCart -= itemToRemove.quantityInCart;
        state.total -= (itemToRemove.price * itemToRemove.quantityInCart);
        
        actualItem.quantityInCart = 0;



        return {
            ...state,
            items: state.items,
            addedItems: new_items,
            total: state.total,
            totalAtCart: state.totalAtCart
        }
    }

    if (action.type === ADD_QUANTITY) {
        //Acha o produto da ação no estoque atual
        let actualItemAdd = state.items.find(item => action.id === item.id);
        
        //Se não tiver produtos em estoque ejeta
        if(actualItemAdd.quantity < 1) return{...state};

        state.totalAtCart += 1;

        actualItemAdd.quantity -= 1;
        
        let addedItem = state.items.find(item => item.id === action.id);
        addedItem.quantityInCart += 1;
        state.total = state.total + addedItem.price
        return {
            ...state,
            items: state.items,
            addedItems: state.addedItems,
            total: state.total,
            totalAtCart: state.totalAtCart
        }
    }
    if (action.type === SUB_QUANTITY) {
        //Acha o produto da ação no estoque atual
        let actualItemSub = state.items.find(item => action.id === item.id);

        state.totalAtCart -= 1;

        actualItemSub.quantity += 1;

        state.total -= actualItemSub.price;

        let removedItem = state.addedItems.find(item => item.id === action.id);

        removedItem.quantityInCart -= 1;

        //Remove se o total passar a ser zero
        let sendRemove = removedItem.quantityInCart < 1 ?
            {...state,addedItems: state.addedItems.filter(item => item.id !== action.id),total: state.total,totalAtCart: state.totalAtCart} : 
            {...state,total: state.total,totalAtCart: state.totalAtCart}
            
            return sendRemove
    }
    
    if (action.type === SET_INITIALS) {
        return Object.assign({}, state, {
            items: state.items.concat(action.payload)
        });
    } else {
        return state;
    }


    
};

export default cartReducer;