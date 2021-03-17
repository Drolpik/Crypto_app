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
    selectedCurrency: 'EUR',
    currencyOptions: [],
    exchangeRatesData: [],
    exchangeRate: 1,
  }

  componentDidMount() {
    // exchange data
    axios.get(EXCHANGE_URL)
      .then((response) => {
        //console.log(response);
        this.setState({currencyOptions: [response.data.base, ...Object.keys(response.data.rates)]});
        this.setState({selectedCurrency: response.data.base});
        this.setState({exchangeRatesData: response.data.rates});

        //console.log(this.state.exchangeRatesData);
        //console.log(this.state.currencyOptions);
        //console.log(this.state.currencyOptions[0]);
      })
      .catch((error) => {
        console.log(error);
      });

      // crypto data
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then((response) => {
        this.setState({coinsData: response.data});
        // console.log('COINSDATA:');
        // console.log(this.state.coinsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.selectedCurrency !== prevState.selectedCurrency) {
      console.log(`Currency Did Update: ${this.state.selectedCurrency}`);
      const CurrencyNames = Object.keys(this.state.exchangeRatesData);
      const index = CurrencyNames.findIndex(el => el === this.state.selectedCurrency);
      console.log(index);
      
      const CurrencyRates = Object.values(this.state.exchangeRatesData);
      const NumRate = CurrencyRates[index];

      this.state.selectedCurrency === 'EUR' 
        ? this.setState({exchangeRate: 1}) 
        : this.setState({exchangeRate: NumRate});
    }
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
        <h1 className={classes.MainHeader}>Search a cryptocurrency</h1>
        <div className={classes.NavTools}>
          <SearchCoin changed={this.searchValueHandler} />
          <CurrencyList
            selectedCurrency={this.state.selectedCurrency} 
            currencyOptions={this.state.currencyOptions}
            changed={this.currencyChangeHandler}
          />
        </div>

        {filterCoins.map(coin => {
          return (
            <CoinTab 
              key={coin.id}
              image={coin.image}
              name={coin.name}  
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              selectedCurrency={this.state.selectedCurrency}
              exchangeRate={this.state.exchangeRate}
            />
          );
        })}
      </div>
    );
  }
}

export default Layout;