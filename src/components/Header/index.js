import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Header = ({ title, subTitle, onClickBackButton }) => (
  <Jumbotron fluid>
    <div className="firstBorder" />
    <div className="secondBorder" />
    <Container fluid>
      <span>{title}</span>
    </Container>
    {subTitle && <div className="subtitle">{subTitle}</div>}
    {onClickBackButton && (
      <div className="back" onClick={onClickBackButton} onKeyPress={() => {}} role="button" tabIndex="0">
        <FontAwesomeIcon icon={faArrowLeft} style={{ 'font-size': '14px' }} />
      </div>
    )}
  </Jumbotron>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  onClickBackButton: PropTypes.func
};

Header.defaultProps = {
  subTitle: null,
  onClickBackButton: null
};

export default Header;
