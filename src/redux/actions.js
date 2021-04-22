import * as actionTypes from './actionTypes.js'; 
import { v4 as uuidv4 } from 'uuid';


export const addItem = (item) => { 
    item.id = uuidv4()
    item.price = parseInt(item.price)
    return {
        type : actionTypes.ADD_ITEM ,
        payload: item
    }
}

export const removeItem = (id) => { 
    return {
        type : actionTypes.REMOVE_ITEM ,
        payload: id
    }
}

export const filterCategory = (category) => { 
    return {
        type : actionTypes.FILTER_CATEGORY,
        payload: category
    }
}

export const sortBy = (field) => { 
    return {
        type : actionTypes.SORT_BY,
        payload: field
    }
}

export const toggleSort = () => { 
    return {
        type : actionTypes.TOGGLE_SORT
    }
}