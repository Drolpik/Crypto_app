import React from 'react'
import classes from './CoinTab.module.scss';

const coinTab = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.CoinRow}>
                <div className={classes.Coin}>
                    <img src={props.image} alt="coin-img"></img>
                    <h1>{props.name}</h1>
                </div>
                <div className={classes.CoinInfo}>
                    <p className={classes.CoinPrice}>${props.price}</p>
                    {props.priceChange < 0 ? (
                        <p className={[classes.CoinPriceChange, classes.CPC_Red].join(' ')}>{props.priceChange.toFixed(2)}%</p>
                    ) : (
                        <p className={[classes.CoinPriceChange, classes.CPC_Green].join(' ')}>{props.priceChange.toFixed(2)}%</p>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default coinTab
