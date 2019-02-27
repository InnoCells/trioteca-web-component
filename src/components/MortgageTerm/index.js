import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Header from '../Header';

class MortageTerm extends React.Component {
  state = {
    term: 30
  }

  onSelectOption = () => this.props.onSelectOption(this.state.term); 

  render () {
    const { term } = this.state;
    const { stepTitle } = this.props;
    return <Container>
      <Header title="Indica el plazo a devolver" subTitle={stepTitle} />   
      <Row>
        <Col>
          {term}
          <Slider onChange={term => this.setState({term})} value={term} min={10} max={40} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={this.onSelectOption}>Seguir</Button>
        </Col>
      </Row>
    </Container>;
  }
}

MortageTerm.propTypes = {
  onSelectOption: PropTypes.func.isRequired
};

export default MortageTerm;