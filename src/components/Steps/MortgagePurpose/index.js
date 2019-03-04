import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Header from '../../Header';

const MortagePurpose = ({ onSelectOption, stepTitle }) => (
  <Container>
    <Header title="¿Para qué quieres tu hipoteca?" subTitle={stepTitle} />
    <Row>
      <Col>
        <Button
          onClick={() => {
            onSelectOption('primary');
          }}
        >
          Vivienda habitual
          <i className="fa fa-home" />
        </Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button
          onClick={() => {
            onSelectOption('occasional');
          }}
        >
          Vivienda ocasional
        </Button>
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
