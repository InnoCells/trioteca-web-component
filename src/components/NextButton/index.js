import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const NextButton = ({ onClick, children, showRightArow, ...props }) => (
  <Button onClick={onClick} {...props}>
    {children}
    {showRightArow && (
      <span className="float-right">
        <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: '14px' }} />
      </span>
    )}
  </Button>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showRightArow: PropTypes.bool
};

NextButton.defaultProps = {
  showRightArow: true
};

export default NextButton;
