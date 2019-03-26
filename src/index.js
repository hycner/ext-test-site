import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import App from './components';
import './index.css';

const rootElement = document.getElementById('root');
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(rootComponent, rootElement);
