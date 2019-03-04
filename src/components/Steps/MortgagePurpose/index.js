import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import NextButton from '../../NextButton';
import Header from '../../Header';

const MortagePurpose = ({ onSelectOption, stepTitle }) => (
  <Container>
    <Header title="¿Para qué quieres tu hipoteca?" subTitle={stepTitle} />
    <Row className="content">
      <NextButton
        onClick={() => {
          onSelectOption('primary');
        }}
      >
        Vivienda habitual
      </NextButton>
      <NextButton
        onClick={() => {
          onSelectOption('occasional');
        }}
      >
        Vivienda ocasional
      </NextButton>
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
