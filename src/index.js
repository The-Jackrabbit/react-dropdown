import React from 'react';
import ReactDOM from 'react-dom';
import Select from './select.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Select selected='VA' testing/>, document.getElementById('root'));
registerServiceWorker();
