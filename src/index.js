import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Positions from './Positions';

import * as serviceWorker from './serviceWorker';
//import WOW from 'wow.js';

import JQUERY from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<Positions />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
