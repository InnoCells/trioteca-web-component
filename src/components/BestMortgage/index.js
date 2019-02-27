import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Spinner } from 'reactstrap';
import Header from '../Header';

const OptionButton = ({ onSelectOption, name, tin, monthlyPayment, error }) => (
  <Button onClick={onSelectOption}>
    <p>{name}</p>
    {error ? (
      <p>{error}</p>
    ) : (
      <div>
        <p>{tin}</p>
        <p>{monthlyPayment}</p>
      </div>
    )}
  </Button>
);

const BestMortage = ({ onSelectOption, options, isFetchingMortgageOptions, stepTitle }) => (
  <Container>
    <Header title="Hemos encontrado la mejor hipoteca para ti" subTitle={stepTitle} />
    {isFetchingMortgageOptions && <Spinner />}
    {!isFetchingMortgageOptions &&
      options &&
      options.map(option => (
        <Row key={option.name}>
          <Col>
            <OptionButton {...option} onSelectOption={() => onSelectOption(option)} />
          </Col>
        </Row>
      ))}
  </Container>
);

const MortgageOptionType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  tin: PropTypes.string.isRequired,
  monthlyPayment: PropTypes.number.isRequired
});

OptionButton.propTypes = {
  ...MortgageOptionType,
  onSelectOption: PropTypes.func.isRequired
};

BestMortage.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  isFetchingMortgageOptions: PropTypes.bool,
  stepTitle: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(MortgageOptionType))
};

BestMortage.defaultProps = {
  stepTitle: null,
  isFetchingMortgageOptions: false,
  options: null
};

export default BestMortage;
