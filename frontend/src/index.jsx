import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

const node = document.createElement('div');
document.body.prepend(node);

ReactDom.render(<App />, node);
