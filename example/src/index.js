require('./index.html');
require('leaflet/dist/leaflet.css');
require('./css/main.css');

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
