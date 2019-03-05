import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Input } from 'reactstrap';
import Slider from 'rc-slider';
import { withTranslation } from 'react-i18next';
import 'rc-slider/assets/index.css';

import NextButton from '../../NextButton';
import Header from '../../Header';
import './style.css';

class SavingsAvailable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savings: props.initialAmount,
      inputSavings: props.initialAmount
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  onSelectOption = () => this.props.onSelectOption(this.state.savings);

  handleTextInputChange = event => {
    this.setState({ inputSavings: event.target.value });
  };

  handleTextInputBlur = () => {
    const { inputSavings, savings } = this.state;
    const newSavings = parseInt(inputSavings, 10);
    if (Number.isNaN(newSavings)) {
      this.setState({ inputSavings: savings });
    } else {
      this.setState({ savings: newSavings });
    }
  };

  handleSliderChange = newSavings => {
    this.setState({ savings: newSavings, inputSavings: newSavings });
  };

  render() {
    const { savings, inputSavings } = this.state;
    const { stepTitle, minAmount, maxAmount, initialAmount, t } = this.props;
    return (
      <Container>
        <Header title={t('savingsAvailable.title')} subTitle={stepTitle} />
        <Row className="content">
          <Row>
            <Col>
              <Input
                className="savingsInput"
                type="number"
                value={inputSavings}
                onChange={this.handleTextInputChange}
                onBlur={this.handleTextInputBlur}
              />
              <Slider
                className="slider"
                onChange={this.handleSliderChange}
                defaultValue={initialAmount}
                tabIndex={-1}
                steps={1}
                value={savings}
                min={minAmount}
                max={maxAmount}
              />
              <NextButton onClick={this.onSelectOption}>{t('common.next')}</NextButton>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

SavingsAvailable.propTypes = {
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  initialAmount: PropTypes.number,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  stepTitle: PropTypes.string
};

SavingsAvailable.defaultProps = {
  initialAmount: 20000,
  minAmount: 10000,
  maxAmount: 1000000,
  stepTitle: null
};

export default withTranslation()(SavingsAvailable);
