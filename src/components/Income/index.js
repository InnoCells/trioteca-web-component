import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Header from '../Header';

const Income = ({ onSelectOption, stepTitle }) => (
  <div>
    <Container>
      <Header title="¿Cuál es el nivel de ingresos netos mensuales de tu familia?" subTitle={stepTitle} />
      <Row>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(700);
            }}
          >
            Menos de 700
          </Button>
        </Col>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(1200);
            }}
          >
            700 a 1200
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(1800);
            }}
          >
            1200 a 1800
          </Button>
        </Col>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(2500);
            }}
          >
            1800 a 2500
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(3500);
            }}
          >
            2500 a 3500
          </Button>
        </Col>
        <Col xs="6">
          <Button
            onClick={() => {
              onSelectOption(3501);
            }}
          >
            3500 o más
          </Button>
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
