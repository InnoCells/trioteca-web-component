import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Header from '../Header';

const OptionButton = ({onSelectOption, name, feeType, fee}) =>
    <Button onClick={onSelectOption}>
        <p>{name}</p>
        <p>{feeType}</p>
        <p>{fee}</p>
    </Button>;

const BestMortage = ({onSelectOption, options, stepTitle}) =>
  <Container>
    <Header title="Hemos encontrado la mejor hipoteca para ti" subTitle={stepTitle} />   
    {options.map((option, index) => 
        <Row>
        <Col>
            <OptionButton {...option} onSelectOption={() => onSelectOption(option) } />
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
            feeType: PropTypes.string.isRequired,
            fee: PropTypes.number.isRequired
        })).isRequired
    .isRequired
};

export default BestMortage;