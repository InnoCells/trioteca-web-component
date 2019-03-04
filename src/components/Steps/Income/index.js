import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import NextButton from '../../NextButton';
import Header from '../../Header';

const Income = ({ onSelectOption, stepTitle }) => (
  <div>
    <Container>
      <Header title="¿Cuál es el nivel de ingresos netos mensuales de tu familia?" subTitle={stepTitle} />
      <Row>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(700);
            }}
          >
            Menos de 700
          </NextButton>
        </Col>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(1200);
            }}
          >
            700 a 1200
          </NextButton>
        </Col>
      </Row>

      <Row>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(1800);
            }}
          >
            1200 a 1800
          </NextButton>
        </Col>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(2500);
            }}
          >
            1800 a 2500
          </NextButton>
        </Col>
      </Row>

      <Row>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(3500);
            }}
          >
            2500 a 3500
          </NextButton>
        </Col>
        <Col xs="6">
          <NextButton
            onClick={() => {
              onSelectOption(3501);
            }}
          >
            3500 o más
          </NextButton>
        </Col>
      </Row>
    </Container>
  </div>
);

Income.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  stepTitle: PropTypes.string
};

Income.defaultProps = {
  stepTitle: null
};

export default Income;
