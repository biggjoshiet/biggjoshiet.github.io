/* basic React example */

import React from 'react';
import ReactDOM from 'react-dom';

// Write code here:
const myList = (
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
)

ReactDOM.render(
  myList,
  document.getElementById('app')
);