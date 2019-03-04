import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import NextButton from '../../NextButton';
import Header from '../../Header';

const MortagePurpose = ({ onSelectOption, stepTitle, t }) => {
  return (
    <Container>
      <Header title={t('mortagePurpose.title')} subTitle={stepTitle} />
      <Row className="content">
        <NextButton
          onClick={() => {
            onSelectOption('primary');
          }}
        >
          {t('mortagePurpose.primaryButtonTitle')}
        </NextButton>
        <NextButton
          onClick={() => {
            onSelectOption('occasional');
          }}
        >
          {t('mortagePurpose.occasionalButtonTitle')}
        </NextButton>
      </Row>
    </Container>
  );
};

MortagePurpose.propTypes = {
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  stepTitle: PropTypes.string
};

MortagePurpose.defaultProps = {
  stepTitle: null
};

export default withTranslation()(MortagePurpose);
