import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { sortBy, filterCategory, toggleSort} from './redux/actions';
import { Item } from './Item.js'
import './ItemList.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

export function ItemList(){
    const classes = useStyles();
    const sortCriteria = useSelector(state => state.itemReducer.sortBy);
    const filterCriteria = useSelector(state => state.itemReducer.filter);
    const sortDirection = useSelector(state => state.itemReducer.desc);
    let items = useSelector(state => state.itemReducer.items);
    const dispatch = useDispatch();  
    let categories = []
    for (const item of items){
        if (!categories.includes(item.category)){
            categories.push(item.category)
        }
    }
    const handleChange = (e) => {
        dispatch(filterCategory(e.target.value))
    }

    const renderButton = (field) => {
        if (sortCriteria === field){
            if (sortDirection === true){
                return( <div onClick={(e) => dispatch(toggleSort())}>
                     <ArrowDropDownIcon/>
                </div>)
            }else{
                return( <div onClick={(e) => dispatch(toggleSort())}> 
                    <ArrowDropUpIcon/> 
                </div>)
            }
        }else{
            return(<div onClick={(e) => dispatch(sortBy(field))}> 
                    <CompareArrowsIcon/> 
                </div>)
        }
    }

    const renderItem = () => {
        const itemComponent = values => {
            return (
            <Item
                values={values}
            />
            )
        }

        if (filterCriteria){
            items = items.filter(item => { return item.category === filterCriteria})
        }
        if(sortCriteria === 'item'){ 
            items.sort((a,b) => (a.item.toLowerCase() > b.item.toLowerCase()) ? 1 : ((b.item.toLowerCase() > a.item.toLowerCase()) ? -1 : 0))
            items = (sortDirection === true) ? items.reverse() : items
        }else if(sortCriteria === 'category'){
            items.sort((a,b) => (a.category.toLowerCase() > b.category.toLowerCase()) ? 1 : ((b.category.toLowerCase() > a.category.toLowerCase()) ? -1 : 0))
            items = (sortDirection === true) ? items.reverse() : items
        }else if(sortCriteria === 'price'){
            items.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            items = (sortDirection === true) ? items.reverse() : items
        }
        return  items.map(item => itemComponent(item))
    }

    return(
        <div style={{margin: '20px 50px'}}>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Show</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={filterCriteria}
                    onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    categories.map((category) => {
                        return <MenuItem value={category}>{category}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
            <div className="header">
                <div className="field"> 
                    <div> Item </div>
                     <div> {renderButton('item')} </div>
                </div>
                <div className="field"> 
                    <div> Category </div>
                     <div> {renderButton('category')} </div>
                </div>
                <div className="field"> 
                    <div> Price </div>
                     <div> {renderButton('price')} </div>
                </div>
                <div> </div>
            </div>
            {renderItem()}
        </div>
    )
}
