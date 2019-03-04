import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const NextButton = ({ onClick, children }) => (
  <div>
    <Button onClick={onClick}>
      {children}
      <span className="float-right">
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </Button>
  </div>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};

export default NextButton;
