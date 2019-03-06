import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';

import { MortgagePurpose, Income, MortgageTerm, SavingsAvailable, BestMortgage } from './components/Steps';
import Footer from './components/Footer';
import fetchMortgageOptions from './api/calculator';

import './App.css';

const minSavingsPercent = purpose => (purpose === 'primary' ? 0.35 : 0.45);

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
            savings: savings < price * minSavingsPercent(term) ? price * minSavingsPercent(term) : savings,
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

  onMortgageSelected = mortgageOption => {
    const { price, provinceId } = this.props;
    const { purpose, income, term } = this.state;
    const { type } = mortgageOption;
    window.open(
      `https://trioteca.com/dashboard/configura/entradadisponible?term=${term}&purpose=${purpose}&income=${income}&type=${type}&price=${price}&provinceId=${provinceId}`,
      '_blank'
    );
  };

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

  SavingsAvailableContainer = ({ nextStep, term, price }) => (
    <SavingsAvailable
      onSelectOption={savings => {
        this.setState({ savings });
        nextStep();
      }}
      initialAmount={price * minSavingsPercent(term)}
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

  BestMortgageContainer = () => {
    const { isFetchingMortgageOptions, mortgageOptions, error } = this.state;
    return (
      <BestMortgage
        onSelectOption={this.onMortgageSelected}
        isFetchingMortgageOptions={isFetchingMortgageOptions}
        options={mortgageOptions}
        error={error}
      />
    );
  };

  render() {
    const { price } = this.props;
    const { term } = this.state;

    return (
      <div className="wizardWrapper">
        <StepWizard>
          <this.MortgagePurposeContainer />
          <this.IncomeContainer />
          <this.SavingsAvailableContainer price={price} term={term} />
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
