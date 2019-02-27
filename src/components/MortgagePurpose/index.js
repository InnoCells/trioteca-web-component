import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Header from '../Header';

const MortagePurpose = ({onSelectOption, stepTitle}) =>
  <Container>
    <Header title="¿Para qué quieres la hipoteca?" subTitle={stepTitle} />   
    <Row>
      <Col>
        <Button onClick={() => { onSelectOption('regular');  }}>Vivienda habitual</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button onClick={() => {onSelectOption('occasional'); }}>Vivienda ocasional</Button>
      </Col>
    </Row>
  </Container>

MortagePurpose.propTypes = {
  onSelectOption: PropTypes.func.isRequired
};

export default MortagePurpose;