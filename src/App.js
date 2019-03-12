import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StepWizard from './components/step-wizard';
import { MortgagePurpose, Income, MortgageTerm, SavingsAvailable, BestMortgage } from './components/Steps';
import Footer from './components/Footer';
import fetchMortgageOptions, { minimumRecommendedSavingsAmount } from './api/calculator';

import './App.css';

class App extends Component {
  state = {
    purpose: null,
    income: null,
    term: null,
    error: null,
    mortgageOptions: { error: null, options: [] },
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
            savings,
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
    const { url } = mortgageOption;
    const { source } = this.props;
    window.open(`${url}&source=${source}`, '_blank');
  };

  MortgagePurposeContainer = ({ nextStep }) => (
    <MortgagePurpose
      onSelectOption={purpose => {
        this.setState({ purpose });
        nextStep();
      }}
    />
  );

  IncomeContainer = ({ nextStep, previousStep }) => (
    <Income
      onSelectOption={income => {
        this.setState({ income });
        nextStep();
      }}
      onClickBackButton={previousStep}
      stepTitle="1 / 3"
    />
  );

  SavingsAvailableContainer = ({ nextStep, previousStep }) => {
    const { purpose } = this.state;
    const { price } = this.props;
    const minRecommendedSavingsAmount = minimumRecommendedSavingsAmount(price, purpose);
    return (
      <SavingsAvailable
        onSelectOption={savings => {
          this.setState({ savings });
          nextStep();
        }}
        onClickBackButton={previousStep}
        initialAmount={minRecommendedSavingsAmount}
        minRecommendedSavingsAmount={minRecommendedSavingsAmount}
        maxAmount={price}
        stepTitle="2 / 3"
      />
    );
  };

  MortgageTermContainer = ({ nextStep, previousStep }) => (
    <MortgageTerm
      onSelectOption={async term => {
        await this.onTermSelected(term);
        nextStep();
      }}
      onClickBackButton={previousStep}
      stepTitle="3 / 3"
    />
  );

  BestMortgageContainer = ({ previousStep }) => {
    const { isFetchingMortgageOptions, mortgageOptions, error } = this.state;
    return (
      <BestMortgage
        onSelectOption={this.onMortgageSelected}
        onClickBackButton={previousStep}
        isFetchingMortgageOptions={isFetchingMortgageOptions}
        options={mortgageOptions}
        error={error}
      />
    );
  };

  render() {
    return (
      <div className="wizardWrapper">
        <StepWizard>
          <this.MortgagePurposeContainer />
          <this.IncomeContainer />
          <this.SavingsAvailableContainer />
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
  provinceId: PropTypes.number.isRequired,
  source: PropTypes.string
};

App.defaultProps = {
  source: null
};

export default App;
