import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import NextButton from '../../NextButton';
import Header from '../../Header';

class SavingsAvailable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savings: props.initialAmount
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  onSelectOption = () => this.props.onSelectOption(this.state.savings);

  render() {
    const { savings } = this.state;
    const { stepTitle, minAmount, maxAmount } = this.props;
    return (
      <Container>
        <Header title="Indica el ahorro inicial disponible" subTitle={stepTitle} />
        <Row>
          <Col>
            {savings}
            <Slider
              onChange={newSavings => this.setState({ savings: newSavings })}
              value={savings}
              min={minAmount}
              max={maxAmount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NextButton onClick={this.onSelectOption}>Seguir</NextButton>
          </Col>
        </Row>
      </Container>
    );
  }
}

SavingsAvailable.propTypes = {
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

export default SavingsAvailable;
