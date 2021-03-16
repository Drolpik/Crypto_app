import React, {Component} from 'react';
import classes from './Layout.module.scss';
import axios from 'axios';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import CoinTab from '../../components/CoinTab/CoinTab';
import CurrencyList from '../../components/CurrencyList/CurrencyList';

const EXCHANGE_URL = 'https://api.exchangeratesapi.io/latest';

class Layout extends Component {
  state = {
    coinsData: [],
    searchValue: '',
    selectedCurrency: '',
    exchangeRate: '',
    currencyOptions: [],
  }

  componentDidMount() {
    // exchange data
    axios.get(EXCHANGE_URL)
      .then((response) => {
        console.log(response);
        this.setState({currencyOptions: [response.data.base, ...Object.keys(response.data.rates)]});
        this.setState({selectedCurrency: response.data.base});

        console.log(response.data.rates)
        console.log(this.state.currencyOptions);
        console.log(this.state.currencyOptions[0]);
      })
      .catch((error) => {
        console.log(error);
      });

      // crypto data
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then((response) => {
        this.setState({coinsData: response.data});
        console.log('COINSDATA:');
        console.log(this.state.coinsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchValueHandler = (event) => {
    this.setState({searchValue: event.target.value});
  }

  currencyChangeHandler = (event) => {
    this.setState({selectedCurrency: event.target.value});
  }

  render() {
    const filterCoins = this.state.coinsData.filter(coin => {
      return coin.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
    });

    return(
      <div className={classes.Container}>
        <SearchCoin changed={this.searchValueHandler} />
        <CurrencyList
          selectedCurrency={this.state.selectedCurrency} 
          currencyOptions={this.state.currencyOptions}
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
              selectedCurrency={this.state.selectedCurrency}
            />
          );
        })}
      </div>
    );
  }
}

export default Layout;
