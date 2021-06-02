import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DemoReduxProxyReducer from './DemoReduxProxyReducer';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <div className="Demo">
      <p>
        With <code>proxyReducer</code>
      </p>
      <Provider store={store}>
        <DemoReduxProxyReducer />
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
