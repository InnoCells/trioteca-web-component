import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Spinner } from 'reactstrap';
import Header from '../Header';

const OptionButton = ({onSelectOption, name, tin, monthlyPayment, error}) =>
    <Button onClick={onSelectOption}>
        <p>{name}</p>
        {error ? <p>{error}</p> : <div><p>{tin}</p><p>{monthlyPayment}</p></div>}
    </Button>;

const BestMortage = ({onSelectOption, options, stepTitle, isFetchingMortgageOptions}) =>
  <Container>
    <Header title="Hemos encontrado la mejor hipoteca para ti" subTitle={stepTitle} />
    {isFetchingMortgageOptions && <Spinner />}
    {!isFetchingMortgageOptions && options && options.map((option, index) => 
        <Row key={option.name}>
            <Col>
                <OptionButton  {...option} onSelectOption={() => onSelectOption(option) } />
            </Col>
        </Row>
    )}
  </Container>

BestMortage.propTypes = {
    stepTitle: PropTypes.string,
    onSelectOption: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            tin: PropTypes.string.isRequired,
            monthlyPayment: PropTypes.number.isRequired
        })).isRequired
};

export default BestMortage;