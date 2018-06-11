import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import './styles/style.scss';

import Routes from './components/Routes/Routes';

render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  document.getElementById('app'),
);

module.hot.accept();
