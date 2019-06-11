import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import Slider from 'rc-slider';
import { withTranslation } from 'react-i18next';
import NextButton from '../../NextButton';
import Header from '../../Header';

// { onSelectOption, stepTitle, t, onClickBackButton }
class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: props.initialAmount,
      inputIncome: props.initialAmount
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  onSelectOption = () => this.props.onSelectOption(this.state.income);

  handleTextInputChange = event => {
    this.setState({ inputIncome: event.target.value });
  };

  handleTextInputBlur = () => {
    const { inputIncome, income } = this.state;
    const newIncome = parseInt(inputIncome, 10);
    if (Number.isNaN(newIncome)) {
      this.setState({ inputIncome: income });
    } else {
      this.setState({ income: newIncome });
    }
  };

  handleSliderChange = newIncome => {
    this.setState({ income: newIncome, inputIncome: newIncome });
  };

  render() {
    const { income, inputIncome } = this.state;
    const { stepTitle, minAmount, maxAmount, initialAmount, t, onClickBackButton } = this.props;
    return (
      <div>
        <Container>
          <Header title={t('income.title')} subTitle={stepTitle} onClickBackButton={onClickBackButton} />
          <Row className="content">
            <Col xs="7">
              <InputGroup>
                <Input
                  className="textInput"
                  type="number"
                  value={inputIncome}
                  onChange={this.handleTextInputChange}
                  onBlur={this.handleTextInputBlur}
                />
                <InputGroupAddon addonType="append">€</InputGroupAddon>
              </InputGroup>
              <Slider
                className="slider"
                onChange={this.handleSliderChange}
                defaultValue={initialAmount}
                tabIndex={-1}
                steps={1}
                value={income}
                min={minAmount}
                max={Math.max(maxAmount, inputIncome)}
              />
              <NextButton onClick={this.onSelectOption}>{t('common.next')}</NextButton>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Income.propTypes = {
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onClickBackButton: PropTypes.func,
  stepTitle: PropTypes.string,
  initialAmount: PropTypes.number,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number
};

Income.defaultProps = {
  stepTitle: null,
  onClickBackButton: null,
  initialAmount: 750,
  minAmount: 0,
  maxAmount: 10000
};

export default withTranslation()(Income);
