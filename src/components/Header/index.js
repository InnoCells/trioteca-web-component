import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';

const Header = ({ title, subTitle }) => (
  <Jumbotron fluid>
    <Container fluid>
      <h2>{title}</h2>
      {subTitle && <p>{subTitle}</p>}
    </Container>
  </Jumbotron>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

Header.defaultProps = {
  subTitle: null
};

export default Header;
