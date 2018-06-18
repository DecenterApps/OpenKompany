import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from 'react-hot-loader';

import store from './store';

import './styles/style.scss';

import Routes from './components/Routes/Routes';

render(
  <AppContainer>
    <Provider store={store}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);

module.hot.accept();
