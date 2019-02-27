import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Header from '../Header';

class SavingsAvailable extends React.Component {
  state = {
    savings: 20000
  };

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
            <Button onClick={this.onSelectOption}>Seguir</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

SavingsAvailable.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  stepTitle: PropTypes.string
};

SavingsAvailable.defaultProps = {
  minAmount: 10000,
  maxAmount: 1000000,
  stepTitle: null
};

export default SavingsAvailable;
