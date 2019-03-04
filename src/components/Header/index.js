import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';
import './styles.css';

const Header = ({ title, subTitle }) => (
  <Jumbotron fluid>
    <div className="firstBorder" />
    <div className="secondBorder" />
    <Container fluid>
      <span>{title}</span>
    </Container>
    {subTitle && <div className="subtitle">{subTitle}</div>}
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
