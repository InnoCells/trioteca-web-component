import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import NextButton from '../../NextButton';
import Header from '../../Header';

const Income = ({ onSelectOption, stepTitle, t }) => (
  <div>
    <Container>
      <Header title={t('income.title')} subTitle={stepTitle} />
      <Row className="content">
        <Row>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(700);
              }}
            >
              {t('income.option1')}
            </NextButton>
          </Col>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(1200);
              }}
            >
              {t('income.option2')}
            </NextButton>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(1800);
              }}
            >
              {t('income.option3')}
            </NextButton>
          </Col>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(2500);
              }}
            >
              {t('income.option4')}
            </NextButton>
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(3500);
              }}
            >
              {t('income.option5')}
            </NextButton>
          </Col>
          <Col xs="6">
            <NextButton
              className="btn-sm"
              onClick={() => {
                onSelectOption(3501);
              }}
            >
              {t('income.option6')}
            </NextButton>
          </Col>
        </Row>
      </Row>
    </Container>
  </div>
);

Income.propTypes = {
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  stepTitle: PropTypes.string
};

Income.defaultProps = {
  stepTitle: null
};

export default withTranslation()(Income);
