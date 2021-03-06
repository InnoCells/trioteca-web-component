import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import Slider from 'rc-slider';
import { withTranslation } from 'react-i18next';
import NextButton from '../../NextButton';
import 'rc-slider/assets/index.css';

import Header from '../../Header';

class MortageTerm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 30,
      inputTerm: 30
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  onSelectOption = () => this.props.onSelectOption(this.state.term);

  handleTextInputChange = event => {
    this.setState({ inputTerm: event.target.value });
  };

  handleTextInputBlur = () => {
    const { inputTerm, term } = this.state;
    const newTerm = parseInt(inputTerm, 10);
    if (Number.isNaN(newTerm)) {
      this.setState({ inputTerm: term });
    } else {
      this.setState({ term: newTerm });
    }
  };

  handleSliderChange = newTerm => {
    this.setState({ term: newTerm, inputTerm: newTerm });
  };

  render() {
    const { term, inputTerm } = this.state;
    const { stepTitle, t, onClickBackButton } = this.props;
    return (
      <Container>
        <Header title={t('mortgageTerm.title')} subTitle={stepTitle} onClickBackButton={onClickBackButton} />
        <Row className="content">
          <Col xs="7">
            <InputGroup>
              <Input
                className="textInput"
                type="number"
                value={inputTerm}
                onChange={this.handleTextInputChange}
                onBlur={this.handleTextInputBlur}
              />
              <InputGroupAddon addonType="append">años</InputGroupAddon>
            </InputGroup>
            <Slider onChange={this.handleSliderChange} tabIndex={-1} value={term} min={10} max={40} step={5} />
            <NextButton onClick={this.onSelectOption}>{t('common.next')}</NextButton>
          </Col>
        </Row>
      </Container>
    );
  }
}

MortageTerm.propTypes = {
  t: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onClickBackButton: PropTypes.func,
  stepTitle: PropTypes.string
};

MortageTerm.defaultProps = {
  stepTitle: null,
  onClickBackButton: null
};

export default withTranslation()(MortageTerm);
