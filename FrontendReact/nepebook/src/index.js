import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import MainRoute from './MainRoute';

ReactDOM.render(
  <React.StrictMode>
    <MainRoute />

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
