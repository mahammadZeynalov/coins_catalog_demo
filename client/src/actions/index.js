import history from '../components/history';

export const fetchCoinsByType = (value) => async dispatch => {
    const coins = await fetch(`/coins/type/${value}`)
        .then(res => res.json())
    history.push(`/coins/${value}`);
    dispatch({ type: 'FETCH_COINS_BY_TYPE', payload: coins });
}

export const fetchCoinsPropertiesCountry = () => dispatch => {
    fetch(`/coins/properties/country`)
        .then(res => res.json())
        .then(data => {
            if (data.result === 0) {
                alert(data.message)
            } else {
                dispatch({ type: 'FETCH_COINS_COUNTRY', payload: data })
            }
        })
}

export const fetchCoinsPropertiesMetal = () => dispatch => {
    fetch(`/coins/properties/metal`)
        .then(res => res.json())
        .then(data => {
            if (data.result === 0) {
                alert(data.message)
            } else {
                dispatch({ type: 'FETCH_COINS_METAL', payload: data })
            }
        })
}

export const fetchCoinsPropertiesQuality = () => dispatch => {
    fetch(`/coins/properties/quality`)
        .then(res => res.json())
        .then(data => {
            if (data.result === 0) {
                alert(data.message)
            } else {
                dispatch({ type: 'FETCH_COINS_QUALITY', payload: data })
            }
        })
}

export const fetchFilteredCoins = (text, state, type, pageSize, currentPage) => dispatch => {
    
    fetch(`/coins/filter`, {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            conditions: state,
            type: type,
            pageSize,
            currentPage
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.result === 0) {
                alert(data.message)
            } else {
                dispatch({ type: 'FETCH_COINS_FILTER', payload: data });
            }
        })
}

export const fetchEditCoin = (values) => dispatch => {
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('face_value', values.face_value);
    formData.append('issue_year', values.issue_year);
    formData.append('price', values.price);
    formData.append('country', values.country);
    formData.append('metal', values.metal);
    formData.append('short_description', values.short_description);
    formData.append('full_description', values.full_description);
    formData.append('quality', values.quality);
    formData.append('weight', values.weight);
    formData.append('coin_type', values.coin_type);
    formData.append('image_averse', values.image_averse);
    formData.append('image_reverse', values.image_reverse);
    fetch(`/coins/${values.id}`, {
        method: 'PUT',
        body: formData
    }).then(res => {
        if (!res.ok) {
            alert('Inputs are not valid!');
        } else {
            history.push('/admin');
            return res.json()
        }
    }).then(res => {
        dispatch({ type: 'EDIT_COIN', payload: res })

    })

}

export const fetchDeleteCoin = (value) => dispatch => {
    fetch(`/coins/${value}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
            } else {
                dispatch({ type: 'DELETE_COIN', payload: value })
            }
        })
}

export const fetchSoloCoin = (id) => dispatch => {
    fetch(`/coins/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.result === 0) {
            } else {
                dispatch({ type: 'FETCH_COIN', payload: data })
            }
        })
}

export const createNewUser = (values) => dispatch => {
    fetch(`/user/register`, {
        method: 'POST',
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            isAdmin: 0
        }),
        headers: { 'Content-type': 'application/json' }
    })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
            } else {
                localStorage.setItem('token', data.token);
                history.push('/coins');
                dispatch({ type: 'LOGIN_USER', payload: data })
            }
        })
}

export const userLogin = values => dispatch => {
    fetch(`/user/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: values.email,
            password: values.password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            if (data.result === 0) {
                alert(data.message)
            } else {
                localStorage.setItem('token', data.token);
                history.push('/coins');
                dispatch({ type: 'LOGIN_USER', payload: data })
            }
        })
}

export const getUserInfo = () => async dispatch => {
    const token = localStorage.token;
    if (token) {
        await fetch(`/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    localStorage.removeItem('token');
                } else {
                    dispatch({ type: 'GET_USER_INFO', payload: data })
                }
            })
    }
}

export const logoutUser = () => {
    history.push('/');
    return {
        type: 'LOGOUT_USER'
    }
}

export const addToCart = (coinId, userId) => dispatch => {
    
    fetch(`/cart`, {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            coinId: coinId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            dispatch({ type: 'ADD_TO_CART', payload: data })
        })
}

export const getUserCart = () => dispatch => {
    const token = localStorage.token;
    
    if (token) {
        fetch(`/cart`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'GET_USER_CART', payload: data })
            })
    }
}

export const toggleFilterModal = () => {
    return {
        type: 'TOGGLE_FILTER_MODAL'
    }
}

export const changefilterParametrs = (values) => {
    return {
        type: 'FILL_FILTER_PARAMS',
        payload: values
    }
}

export const changeSearchParametrs = (value) => {
    
    return {
        type: 'FILL_SEARCH_PARAMS',
        payload: value
    }
}

export const changeCoinsOnPage = (value) => {
    return {
        type: 'CHANGE_PAGE_SIZE',
        payload: value
    }
}

export const changeCurrentPage = (value) => {
    return {
        type: 'CHANGE_CURRENT_PAGE',
        payload: value
    }
}

export const resetCurrentPage = () => {
    return {
        type: 'RESET_CURRENT_PAGE',
        payload: 1
    }
}

export const CREATE_COIN = {
    START_FETCH: "CREATE_COIN_START_FETCH",
    FAIL_FETCH: "CREATE_COIN_FAIL_FETCH",
    FINISH_FETCH: "CREATE_COIN_FINISH_FETCH"
};
export const startFetchCreateCoin = () => ({
    type: CREATE_COIN.START_FETCH
});
export const failFetchCreateCoin = error => ({
    type: CREATE_COIN.FAIL_FETCH,
    payload: error
});
export const finishFetchCreateCoin = data => ({
    type: CREATE_COIN.FINISH_FETCH,
    payload: data
});

export const createCoin = values => async dispatch => {
    dispatch(startFetchCreateCoin());
    try {
        let formData = new FormData();
        
        formData.append('name', values.name);
        formData.append('face_value', values.face_value);
        formData.append('issue_year', values.issue_year);
        formData.append('price', values.price);
        formData.append('country', values.country);
        formData.append('metal', values.metal);
        formData.append('short_description', values.short_description);
        formData.append('full_description', values.full_description);
        formData.append('quality', values.quality);
        formData.append('weight', values.weight);
        formData.append('coin_type', values.coin_type);
        formData.append('image_averse', values.image_averse);
        formData.append('image_reverse', values.image_reverse);
        const data = await fetch(`/coins`, {
            method: 'POST',
            body: formData
        });
        dispatch(finishFetchCreateCoin(data));
        dispatch({ type: 'OPEN_MODAL' });
    } catch (error) {
        dispatch(failFetchCreateCoin(error));
        dispatch({ type: 'OPEN_MODAL' });
    }
};

export const closeModalCreateEdit = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}

export const changeBuySelect = (value) => {
    return {
        type: 'CHANGE_BUY_OR_SELL',
        payload: value
    }
}

export const changeOnPagePosts = (value) => {
    return {
        type: 'CHANGE_POSTS_ON_PAGE',
        payload: value
    }
}

export const setCoinMemorial = (value) => {
    return {
        type: 'MEMORIAL',
        payload: value
    }
}

export const setCoinExclusive = (value) => {
    return {
        type: 'EXCLUSIVE',
        payload: value
    }
}

export const setCoinInvested = (value) => {
    return {
        type: 'INVESTED',
        payload: value
    }
}

export const resetCoinType = () => {
    return {
        type: 'RESET_COIN_TYPE'
    }
}