import React from 'react';
import classes from './CurrencyList.module.scss';

const currencyList = (props) => (
    <select value={props.currency} onChange={props.changed} className={classes.CurrencyList}>
        <option value="USD" label="US dollar">USD</option>
        <option value="EUR" label="Euro">EUR</option>
        <option value="PLN" label="Polish złoty">PLN</option>
        <option value="JPY" label="Japanese yen">JPY</option>
        <option value="GBP" label="Pound sterling">GBP</option>
        <option value="CHF" label="Swiss franc">CHF</option>
        <option value="CAD" label="Canadian dollar">CAD</option>
    </select>
);

export default currencyList;