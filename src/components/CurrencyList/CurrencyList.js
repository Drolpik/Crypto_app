import React from 'react';
import classes from './CurrencyList.module.scss';

const currencyList = (props) => (
    <div className={classes.Container}>
        <select value={props.selectedCurrency} onChange={props.changed} className={classes.CurrencyList}>
            {props.currencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default currencyList;