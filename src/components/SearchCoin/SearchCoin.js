import React from 'react';
import classes from './SearchCoin.module.scss';

const searchCoin = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Form}>
                <input 
                    type="text"
                    required 
                    autoComplete="off"
                    name="name"
                    onChange={props.changed} >
                </input>
                <label htmlFor="name" className={classes.LabelName}>
                    <span className={classes.ContentName}>Cryptocurrency name</span>
                </label>
            </div>
        </div>
    );
}

export default searchCoin;