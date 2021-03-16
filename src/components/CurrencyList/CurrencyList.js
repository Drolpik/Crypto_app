import React from 'react';
import classes from './CurrencyList.module.scss';

const currencyList = (props) => (
    <select value={props.selectedCurrency} onChange={props.changed} className={classes.CurrencyList}>
        {props.currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

export default currencyList;