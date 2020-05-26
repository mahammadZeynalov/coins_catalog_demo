import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { CREATE_COIN } from "../actions";

const coins = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_COINS_BY_TYPE':
            return action.payload;
        case 'CREATE_COIN':
            return state;
        case 'FETCH_COINS_FILTER':
            return action.payload;
        case 'EDIT_COIN':
            return state; // ??
        case 'DELETE_COIN':
            return {
                ...state,
                paginated: state.paginated.filter(coin => coin.id !== action.payload)
            }
        default:
            return state;
    }
}

const coin = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_COIN':
            return action.payload
        default:
            return state
    }
}

const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload;
        case 'LOGOUT_USER':
            return {};
        case 'GET_USER_INFO':
            return action.payload;
        default:
            return state;
    }
}

const cart = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_CART':
            return action.payload
        case 'ADD_TO_CART':
            let copy = [...state];
            copy.push(action.payload)
            return copy;
        default:
            return state
    }
}

const filterModalState = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_FILTER_MODAL':
            return !state
        default:
            return state
    }
}

const pageSize = (state = 3, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE_SIZE':
            return action.payload
        default:
            return state
    }
}


const currentPage = (state = 1, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_PAGE':
            return action.payload
        case 'RESET_CURRENT_PAGE':
            return action.payload;
        default:
            return state
    }
}


const coinsProperties = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_COINS_COUNTRY':
            return {
                ...state,
                country: action.payload
            }
        case 'FETCH_COINS_METAL':
            return {
                ...state,
                metal: action.payload
            }
        case 'FETCH_COINS_QUALITY':
            return {
                ...state,
                quality: action.payload
            }
        default:
            return state
    }
}

const filterParams = (state = [], action) => {
    switch (action.type) {
        case 'FILL_FILTER_PARAMS':
            return action.payload
        default:
            return state;
    }
}

const searchParams = (state = '', action) => {
    switch (action.type) {
        case 'FILL_SEARCH_PARAMS':
            return action.payload;
        default:
            return state
    }
}


const initialState = {
  data: null,
  isFetching: false,
  error: null
};
const createdCoin = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COIN.START_FETCH:
      return { ...state, isFetching: true };
    case CREATE_COIN.FINISH_FETCH:
      return { isFetching: false, data: action.payload, error: null };
    case CREATE_COIN.FAIL_FETCH:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};

const modalCreateEdit = (state = false, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return !state
        case 'CLOSE_MODAL':
            return !state
        default:
            return state
    }
}

const buyOrSell = (state = 'buy', action) => {
    switch(action.type) {
        case 'CHANGE_BUY_OR_SELL':
            return action.payload
        default:
            return state
    }
}

const selectOnPagePosts = (state = 3, action) => {
    switch(action.type) {
        case 'CHANGE_POSTS_ON_PAGE':
            return action.payload
        default:
            return state
    }
}

const coinType = (state = '', action) => {
    switch(action.type) {
        case 'MEMORIAL':
            return action.payload
        case 'EXCLUSIVE':
            return action.payload;
        case 'INVESTED':
            return action.payload
        case 'RESET_COIN_TYPE':
            return '';
        default:
            return state;
        
    }
}

export default combineReducers({
    coin,
    coins,
    coinsProperties,
    form: formReducer,
    user,
    cart,
    filterModalState,
    filterParams,
    pageSize,
    currentPage,
    searchParams,
    createdCoin,
    modalCreateEdit,
    buyOrSell,
    selectOnPagePosts,
    coinType
});