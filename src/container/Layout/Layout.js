import React, {Component} from 'react';
import classes from './Layout.module.scss';
import axios from 'axios';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import CoinTab from '../../components/CoinTab/CoinTab';
import CurrencyList from '../../components/CurrencyList/CurrencyList';

class Layout extends Component {
  state = {
    coinsData: [],
    searchValue: '',
    currency: 'USD',
  }

  componentDidMount() {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.state.currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then((response) => {
        this.setState({coinsData: response.data});
        console.log('COINSDATA:');
        console.log(this.state.coinsData);
        console.log(this.state.currency);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.currency !== prevState.currency) {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.state.currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then((response) => {
        this.setState({coinsData: response.data});
        console.log('COINSDATA FROM CDIDUPDATE:');
        console.log(this.state.coinsData);
        console.log(this.state.currency);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  searchValueHandler = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  currencyChangeHandler = (event) => {
    this.setState({currency: event.target.value});
  }

  render() {
    const filterCoins = this.state.coinsData.filter(coin => {
      return coin.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
    });

    return(
      <div className={classes.Container}>
        <SearchCoin changed={this.searchValueHandler} />
        <CurrencyList 
          currency={this.state.currency} 
          changed={this.currencyChangeHandler}
        />

        {filterCoins.map(coin => {
          return (
            <CoinTab 
              key={coin.id}
              image={coin.image}
              name={coin.name}  
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              currencyName={this.state.currency}
            />
          );
        })}
      </div>
    );
  }
}

export default Layout;
