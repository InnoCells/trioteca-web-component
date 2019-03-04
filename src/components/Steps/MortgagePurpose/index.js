import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import NextButton from '../../NextButton';
import Header from '../../Header';

const MortagePurpose = ({ onSelectOption, stepTitle }) => (
  <Container>
    <Header title="¿Para qué quieres tu hipoteca?" subTitle={stepTitle} />
    <Row>
      <Col>
        <NextButton
          onClick={() => {
            onSelectOption('primary');
          }}
        >
          Vivienda habitual
        </NextButton>
      </Col>
    </Row>
    <Row>
      <Col>
        <NextButton
          onClick={() => {
            onSelectOption('occasional');
          }}
        >
          Vivienda ocasional
        </NextButton>
      </Col>
    </Row>
  </Container>
);

MortagePurpose.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  stepTitle: PropTypes.string
};

MortagePurpose.defaultProps = {
  stepTitle: null
};

export default MortagePurpose;
