import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from './translations';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

const urlParams = new URLSearchParams(window.location.search);
const price = parseInt(urlParams.get('price'), 10);
const provinceId = parseInt(urlParams.get('provinceId'), 10);
const source = urlParams.get('source');

if (Number.isNaN(price)) {
  throw new Error('Invalid parameter "price"');
}

if (Number.isNaN(provinceId)) {
  throw new Error('Invalid parameter "provinceId"');
}

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App price={price} provinceId={provinceId} source={source} />
  </I18nextProvider>,
  document.getElementById('root')
);
