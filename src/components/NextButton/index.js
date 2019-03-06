import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const NextButton = ({ onClick, children, ...props }) => (
  <Button onClick={onClick} {...props}>
    {children}
    <span className="float-right">
      <FontAwesomeIcon icon={faAngleRight} />
    </span>
  </Button>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default NextButton;
