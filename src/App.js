import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';

import { MortgagePurpose, Income, MortgageTerm, SavingsAvailable, BestMortgage } from './components/Steps';
import Footer from './components/Footer';
import fetchMortgageOptions from './api/calculator';

import './App.css';

const MIN_SAVINGS_PERCENT = 0.3321;

class App extends Component {
  state = {
    purpose: null,
    income: null,
    term: null,
    error: null,
    mortgageOptions: [],
    isFetchingMortgageOptions: false
  };

  onTermSelected = async newTerm =>
    new Promise(async resolve => {
      this.setState({ term: newTerm, isFetchingMortgageOptions: true }, async () => {
        resolve();
        const { purpose, term, income, savings } = this.state;
        const { provinceId, price } = this.props;
        try {
          const mortgageOptions = await fetchMortgageOptions({
            price,
            provinceId,
            savings: savings < price * MIN_SAVINGS_PERCENT ? price * MIN_SAVINGS_PERCENT : savings,
            term,
            purpose,
            income
          });
          this.setState({ mortgageOptions, isFetchingMortgageOptions: false });
        } catch (error) {
          this.setState({ error: error.message, isFetchingMortgageOptions: false });
        }
      });
    });

  MortgagePurposeContainer = ({ nextStep }) => (
    <MortgagePurpose
      onSelectOption={purpose => {
        this.setState({ purpose });
        nextStep();
      }}
    />
  );

  IncomeContainer = ({ nextStep }) => (
    <Income
      onSelectOption={income => {
        this.setState({ income });
        nextStep();
      }}
      stepTitle="1 / 3"
    />
  );

  SavingsAvailableContainer = ({ nextStep, price }) => (
    <SavingsAvailable
      onSelectOption={savings => {
        this.setState({ savings });
        nextStep();
      }}
      initialAmount={price * MIN_SAVINGS_PERCENT}
      maxAmount={price}
      stepTitle="2 / 3"
    />
  );

  MortgageTermContainer = ({ nextStep }) => (
    <MortgageTerm
      onSelectOption={async term => {
        await this.onTermSelected(term);
        nextStep();
      }}
      stepTitle="3 / 3"
    />
  );

  BestMortgageContainer = () => (
    <BestMortgage
      onSelectOption={mortgageOption => {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ mortgageOption });
      }}
      // eslint-disable-next-line react/destructuring-assignment
      isFetchingMortgageOptions={this.state.isFetchingMortgageOptions}
      // eslint-disable-next-line react/destructuring-assignment
      options={this.state.mortgageOptions}
      // eslint-disable-next-line react/destructuring-assignment
      error={this.state.error}
    />
  );

  render() {
    const { price } = this.props;

    return (
      <div>
        <StepWizard>
          <this.MortgagePurposeContainer />
          <this.IncomeContainer />
          <this.SavingsAvailableContainer price={price} />
          <this.MortgageTermContainer />
          <this.BestMortgageContainer />
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
