import React from 'react';
import clsx from 'clsx';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch } from "react-redux";
import { addItem } from './redux/actions';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));

export function ItemSelection(){
    const classes = useStyles();
    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        item: '',
        category: '',
        price: null,
      });

      const callAddItem = () => {
          if (values.item === '' || values.category === '' || values.price === null){
            alert("Missing one or more fields");
          }else{
              dispatch(addItem(values))
              setValues({item: '', category: '', price: null});
          }
      }
      const handleChange = (prop) => (e) => {
          if (prop === 'price' && isNaN(e.target.value)){
            alert("Must input numbers");
          }else{
            setValues({ ...values, [prop]: e.target.value });
          }
      };

    return(
        <div className={classes.root}>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Item</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={values.item}
                    onChange={handleChange('item')}
                />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Category</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={values.category}
                    onChange={handleChange('category')}
                />
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={values.price}
                    onChange={handleChange('price')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
            <Button
                style={{backgroundColor:'#2A70F5', border: 'none',color: 'white',textDecoration: 'none', width: '5%', height:'50px',
                display: 'inline-block',cursor: 'pointer'}}
                onClick={callAddItem}> Add
             </Button>
        </div>
    )
}
