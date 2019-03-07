import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import NextButton from '../../NextButton';
import Header from '../../Header';
import './styles.css';

const OptionButton = ({ onSelectOption, option: { name, tin, monthlyPayment, error } }) => (
  <NextButton
    onClick={() => !error && onSelectOption()}
    className={`bestMortgage-btn ${error ? 'error' : ''}`}
    showRightArow={!error}
  >
    {error ? (
      `${error}`
    ) : (
      <span>
        <span className="bestMortgage-name">{name}</span>
        <br />
        <span className="bestMortgage-tin">{tin}</span>
        <br />
        <span className="bestMortgage-monthlyPayment bestMortgage-monthlyPaymentAmount">{monthlyPayment}</span>
        <span className="bestMortgage-monthlyPayment bestMortgage-monthlyPaymentLabel">€/mes</span>
      </span>
    )}
  </NextButton>
);

// eslint-disable-next-line react/prefer-stateless-function
class BestMortage extends React.Component {
  render() {
    const { onSelectOption, options, isFetchingMortgageOptions, stepTitle, error, t, onClickBackButton } = this.props;

    if (error) {
      return (
        <Container>
          <p>{error}</p>
        </Container>
      );
    }

    return (
      <Container>
        <Header title={t('bestMortgage.title')} subTitle={stepTitle} onClickBackButton={onClickBackButton} />
        <Row className="content">
          <Col xs="7">
            {isFetchingMortgageOptions && <Spinner />}
            {!isFetchingMortgageOptions &&
              options &&
              options.map(option => (
                <OptionButton key={option.name} option={option} onSelectOption={() => onSelectOption(option)} />
              ))}
          </Col>
        </Row>
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
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onClickBackButton: PropTypes.func,
  isFetchingMortgageOptions: PropTypes.bool,
  stepTitle: PropTypes.string,
  options: PropTypes.arrayOf(MortgageOptionType),
  error: PropTypes.string
};

BestMortage.defaultProps = {
  stepTitle: null,
  isFetchingMortgageOptions: false,
  options: null,
  error: null,
  onClickBackButton: null
};

export default withTranslation()(BestMortage);
