import React, { Component } from 'react';
import StepWizard from 'react-step-wizard';

import Footer from './components/Footer'
import MortgagePurpose from './components/MortgagePurpose';
import Income from './components/Income';
import MortgageTerm from './components/MortgageTerm';
import BestMortgage from './components/BestMortgage';

import './App.css';

class App extends Component {

  state = {
    purpose: null,
    income: null,
    term: null,
    mortgageOption: null
  }

  Step1 = ({nextStep}) => 
    <MortgagePurpose onSelectOption={purpose => {this.setState({purpose}); nextStep(); } } stepTitle="1/3" />

  Step2 = ({nextStep}) => 
    <Income onSelectOption={income => {this.setState({income}); nextStep(); } } stepTitle="2/3" />

  Step3 = ({nextStep}) => 
    <MortgageTerm onSelectOption={term => {this.setState({term}); nextStep(); } } stepTitle="3/3" />
  
  Step4 = ({nextStep}) => 
    <BestMortgage onSelectOption={mortgageOption => {this.setState({mortgageOption}); } }
      options={[
        { name: 'Hipoteca Fija', feeType: '2,25% TIN', fee: 650 },
        { name: 'Hipoteca Variable', feeType: 'Euribor + 0,79%', fee: 524 },
      ]} />


  render() {
    return (
      <div>
        {JSON.stringify(this.state, null, 4)}
        <StepWizard >
          <this.Step1 />
          <this.Step2 />
          <this.Step3 />
          <this.Step4 />
        </StepWizard>
      <Footer />
      </div>
    );
  }
}

export default App;
