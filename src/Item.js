import React from 'react';
import './Item.css'
import { useDispatch } from "react-redux";
import { removeItem } from './redux/actions';

export function Item(props){
    const dispatch = useDispatch();
    return(
        <div className='item'>
            <div>
                {props.values.item}
            </div>
            <div>
                {props.values.category}
            </div>
            <div>
                {props.values.price}
            </div>
            <div>
                <button onClick={(e) => dispatch(removeItem(props.values.id))}>
                    X
                </button>
            </div>
        </div>
   )
}