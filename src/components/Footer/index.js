import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './styles.css';
import logo from './logo.svg';

const Footer = ({ t }) => (
  <div className="footer">
    {t('footer.title')}
    <img src={logo} alt="Trioteca" className="logo" />
  </div>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation()(Footer);
