import { 
    ADD_ITEM,
    REMOVE_ITEM,
    FILTER_CATEGORY,
    SORT_BY,
    TOGGLE_SORT
} from '../actionTypes.js'

const initialState = {

    items: [],
    sortBy: null,
    filter: '',
    desc: true
}

const itemReducer = (state=initialState,action) => {
     switch(action.type){
        case ADD_ITEM:
            let addItems = [...state.items, action.payload]
            return{
                ...state,
                items: addItems
            }
        case REMOVE_ITEM:
            let removeItems = state.items.filter((item) => item.id !== action.payload)
                return{
                    ...state,
                    items: removeItems
                }
        case FILTER_CATEGORY:
            return{
                ...state,
                filter: action.payload,
            }
        case SORT_BY:
            return{
                ...state,
                sortBy: action.payload,
                desc: true
            }
        case TOGGLE_SORT:
            let newDesc = !state.desc
            return{
                ...state,
                desc: newDesc
            }
        default:
            console.log(state)
            return state;
    }
}

export default itemReducer;