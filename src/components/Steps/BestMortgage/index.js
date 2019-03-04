import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner } from 'reactstrap';
import NextButton from '../../NextButton';
import Header from '../../Header';

const OptionButton = ({ onSelectOption, option: { name, tin, monthlyPayment, error } }) => (
  <NextButton onClick={onSelectOption}>
    <p>{name}</p>
    {error ? (
      <p>{error}</p>
    ) : (
      <div>
        <p>{tin}</p>
        <p>{monthlyPayment}</p>
      </div>
    )}
  </NextButton>
);

// eslint-disable-next-line react/prefer-stateless-function
class BestMortage extends React.Component {
  render() {
    const { onSelectOption, options, isFetchingMortgageOptions, stepTitle, error } = this.props;

    if (error) {
      return (
        <Container>
          <p>{error}</p>
        </Container>
      );
    }

    return (
      <Container>
        <Header title="Hemos encontrado la mejor hipoteca para ti" subTitle={stepTitle} />
        {isFetchingMortgageOptions && <Spinner />}
        {!isFetchingMortgageOptions &&
          options &&
          options.map(option => (
            <Row key={option.name}>
              <Col>
                <OptionButton option={option} onSelectOption={() => onSelectOption(option)} />
              </Col>
            </Row>
          ))}
      </Container>
    );
  }
}

const MortgageOptionType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  tin: PropTypes.string,
  monthlyPayment: PropTypes.number
});

OptionButton.propTypes = {
  option: MortgageOptionType.isRequired,
  onSelectOption: PropTypes.func.isRequired
};

BestMortage.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  isFetchingMortgageOptions: PropTypes.bool,
  stepTitle: PropTypes.string,
  options: PropTypes.arrayOf(MortgageOptionType),
  error: PropTypes.string
};

BestMortage.defaultProps = {
  stepTitle: null,
  isFetchingMortgageOptions: false,
  options: null,
  error: null
};

export default BestMortage;
