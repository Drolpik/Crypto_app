import React from 'react';
import classes from './SearchCoin.module.scss';

const searchCoin = (props) => {
    return (
        <div className={classes.Container}>
            <h1>Search a cryptocurrency</h1>
            <input 
                type="text"
                placeholder="Enter crypto name" 
                onChange={props.changed} >
            </input>
        </div>
    );
}

export default searchCoin;