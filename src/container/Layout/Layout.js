import React, {Component} from 'react';
import classes from './Layout.module.scss';
import axios from 'axios';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import CoinTab from '../../components/CoinTab/CoinTab';
import CurrencyList from '../../components/CurrencyList/CurrencyList';
import SortOptions from '../../components/Sort/SortOptions/SortOptions';
import Sort from '../../components/Sort/Sort';
import {EXCHANGE_URL, CRYPTO_URL} from '../../api/config';

class Layout extends Component {
  state = {
    coinsData: [],
    searchValue: '',
    selectedCurrency: '',
    currencyOptions: [],
    exchangeRatesData: [],
    exchangeRate: 1,
    sortStatus: '',
    sortOrder: '',
    sortNameBtn: false,
    sortPriceBtn: false,
    sortDayChangeBtn: false,
  }

  componentDidMount() {
    // exchange data
    axios.get(EXCHANGE_URL)
      .then((response) => {
        this.setState({currencyOptions: [...Object.keys(response.data.rates)]});
        this.setState({selectedCurrency: response.data.base});
        this.setState({exchangeRatesData: response.data.rates});
      })
      .catch((error) => {
        console.log(error);
      });

      // crypto data
      axios.get(CRYPTO_URL)
      .then((response) => {
        this.setState({coinsData: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // Select currency
    if(this.state.selectedCurrency !== prevState.selectedCurrency) {
      const CurrencyNames = Object.keys(this.state.exchangeRatesData);
      const index = CurrencyNames.findIndex(el => el === this.state.selectedCurrency);
      
      const CurrencyRates = Object.values(this.state.exchangeRatesData);
      const NumRate = CurrencyRates[index];

      this.state.selectedCurrency === 'USD' 
        ? this.setState({exchangeRate: 1}) 
        : this.setState({exchangeRate: NumRate});
    }

    // Sort by name
    if(this.state.sortNameBtn !== prevState.sortNameBtn) {
      if(this.state.sortNameBtn) {
        this.setState({
          sortStatus: 'name',
          sortOrder: 'alphabetically'
        });
      }
      else {
        this.setState({
          sortStatus: 'name',
          sortOrder: 'not_alphabetically'
        });
      }
    }
    // Sort by price
    if(this.state.sortPriceBtn !== prevState.sortPriceBtn) {
      if(this.state.sortPriceBtn) {
        this.setState({
          sortStatus: 'price',
          sortOrder: 'descending'
        });
      }
      else {
        this.setState({
          sortStatus: 'price',
          sortOrder: 'ascending'
        });
      }
    }
    // Sort by day change
    if(this.state.sortDayChangeBtn !== prevState.sortDayChangeBtn) {
      if(this.state.sortDayChangeBtn) {
        this.setState({
          sortStatus: 'priceChange',
          sortOrder: 'descending'
        });
      }
      else {
        this.setState({
          sortStatus: 'priceChange',
          sortOrder: 'ascending'
        });
      }
    }
  }

  searchValueHandler = (event) => {
    this.setState({searchValue: event.target.value});
  }

  currencyChangeHandler = (event) => {
    this.setState({selectedCurrency: event.target.value});
  }

  sortNameBtnHandler = (event) => {
    this.setState(prevState => ({
      sortNameBtn: !prevState.sortNameBtn
    }));
  }

  sortPriceBtnHandler = (event) => {
    this.setState(prevState => ({
      sortPriceBtn: !prevState.sortPriceBtn
    }));
  }

  sortDayChangeBtnHandler = (event) => {
    this.setState(prevState => ({
      sortDayChangeBtn: !prevState.sortDayChangeBtn
    }));
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

        <SortOptions 
          name_Click={this.sortNameBtnHandler}
          price_Click={this.sortPriceBtnHandler}
          dayChange_Click={this.sortDayChangeBtnHandler}
        />

        <Sort by={this.state.sortStatus} order={this.state.sortOrder}>
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
        </Sort>
      </div>
      
    );
  }
}

export default Layout;