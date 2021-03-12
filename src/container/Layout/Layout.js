import React, {Component} from 'react';
import classes from './Layout.module.scss';
import axios from 'axios';
import {URL} from '../../api/config';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import CoinTab from '../../components/CoinTab/CoinTab';

class Layout extends Component {
  state = {
    coinsData: [],
    searchValue: '',
  }

  componentDidMount() {
    axios.get(URL)
      .then((response) => {
        this.setState({ coinsData: response.data });
        console.log('COINSDATA:');
        console.log(this.state.coinsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchValueHandler = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    const filterCoins = this.state.coinsData.filter(coin => {
      return coin.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
    });

    return(
      <div className={classes.Container}>
        <SearchCoin changed={this.searchValueHandler} />

        {filterCoins.map(coin => {
          return (
            <CoinTab 
              key={coin.id}
              image={coin.image}
              name={coin.name}  
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    );
  }
}

export default Layout;
