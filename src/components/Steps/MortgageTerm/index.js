import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Slider from 'rc-slider';
import NextButton from '../../NextButton';
import 'rc-slider/assets/index.css';

import Header from '../../Header';

class MortageTerm extends React.Component {
  state = {
    term: 30
  };

  // eslint-disable-next-line react/destructuring-assignment
  onSelectOption = () => this.props.onSelectOption(this.state.term);

  render() {
    const { term } = this.state;
    const { stepTitle } = this.props;
    return (
      <Container>
        <Header title="Indica el plazo a devolver" subTitle={stepTitle} />
        <Row className="content">
          <Row>
            <Col>
              {term}
              <Slider onChange={newTerm => this.setState({ term: newTerm })} value={term} min={10} max={40} />
            </Col>
          </Row>
          <Row>
            <Col>
              <NextButton onClick={this.onSelectOption}>Seguir</NextButton>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

MortageTerm.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  stepTitle: PropTypes.string
};

MortageTerm.defaultProps = {
  stepTitle: null
};

export default MortageTerm;
