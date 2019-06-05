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

  postMessage = data => window.parent.postMessage(data, process.env.REACT_APP_IFRAME_HOST);

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

    const { purpose, income, term, savings } = this.state;
    this.postMessage({ event: 'goToTrioteca', purpose, income, term, savings });
  };

  MortgagePurposeContainer = ({ nextStep }) => (
    <MortgagePurpose
      onSelectOption={purpose => {
        this.setState({ purpose });
        nextStep();
        this.postMessage({ event: 'goToStep1' });
      }}
    />
  );

  IncomeContainer = ({ nextStep, previousStep }) => (
    <Income
      onSelectOption={income => {
        this.setState({ income });
        nextStep();
        this.postMessage({ event: 'goToStep2' });
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
          this.postMessage({ event: 'goToStep3' });
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
        this.postMessage({ event: 'goToStep4' });
      }}
      onClickBackButton={previousStep}
      stepTitle="3 / 3"
    />
  );

  BestMortgageContainer = ({ previousStep }) => {
    const { isFetchingMortgageOptions, mortgageOptions, error } = this.state;
    if (mortgageOptions && mortgageOptions.options.length > 0) {
      const { options } = mortgageOptions;
      const fixed = options.filter(option => option.type === 'F')[0];
      const variable = options.filter(option => option.type === 'V')[0];
      const minMonthlyAmountFixed = fixed ? fixed.monthlyPayment : null;
      const numBanksFixed = fixed ? fixed.total : null;
      const minMonthlyAmountVariable = variable ? variable.monthlyPayment : null;
      const numBanksVariable = variable ? variable.total : null;

      this.postMessage({
        event: 'mortgageInfo',
        minMonthlyAmountFixed,
        numBanksFixed,
        minMonthlyAmountVariable,
        numBanksVariable
      });
    }
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
