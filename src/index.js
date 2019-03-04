import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from './translations';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App price={200000} provinceId={10} />
  </I18nextProvider>,
  document.getElementById('root')
);
