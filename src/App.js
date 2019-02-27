import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';

import Footer from './components/Footer'
import MortgagePurpose from './components/MortgagePurpose';
import Income from './components/Income';
import MortgageTerm from './components/MortgageTerm';
import SavingsAvailable from './components/SavingsAvailable';
import BestMortgage from './components/BestMortgage';
import fetchMortgageOptions from './api/calculator';

import './App.css';

class App extends Component {

  state = {
    purpose: null,
    income: null,
    term: null,
    mortgageOptions: [],
    isFetchingMortgageOptions: false
  }

  onTermSelected = async (term) => new Promise(async (resolve) => {
    this.setState({term, isFetchingMortgageOptions: true}, async (currentState) => {
      resolve();
      const { term, purpose, income, savings } = this.state;
      const { provinceId, price } = this.props;
      const mortgageOptions = await fetchMortgageOptions({ price, provinceId, savings, term, purpose, income });
      this.setState({mortgageOptions, isFetchingMortgageOptions: false});
    })
  });

  MortgagePurpose = ({nextStep}) => 
    <MortgagePurpose onSelectOption={purpose => {this.setState({purpose}); nextStep(); } } />

  Income = ({nextStep}) => 
    <Income onSelectOption={income => {this.setState({income}); nextStep(); } } stepTitle="1/3" />

  SavingsAvailable = ({nextStep}) => 
    <SavingsAvailable onSelectOption={savings => {this.setState({savings}); nextStep(); } } maxAmount={this.props.price} stepTitle="2/3" />

  MortgageTerm = ({nextStep}) => 
    <MortgageTerm onSelectOption={async (term) => {
        await this.onTermSelected(term);
        nextStep();
        } } stepTitle="3/3" />
  
  BestMortgage = ({nextStep}) => 
    <BestMortgage onSelectOption={mortgageOption => {this.setState({mortgageOption}); } }
      isFetchingMortgageOptions={this.state.isFetchingMortgageOptions}
      options={this.state.mortgageOptions} />


  render() {
    return (
      <div>
        <StepWizard >
          <this.MortgagePurpose />
          <this.Income />
          <this.SavingsAvailable />
          <this.MortgageTerm />
          <this.BestMortgage />
        </StepWizard>
      <Footer />
      </div>
    );
  }
}

App.propTypes = {
  price: PropTypes.number.isRequired,
  provinceId: PropTypes.number.isRequired
};

export default App;
