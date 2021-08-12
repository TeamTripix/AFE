import React from 'react';
import ReactDOM from 'react-dom';
import MaterialAdmin from './materialAdmin';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MaterialAdmin />, document.getElementById('root'));

serviceWorker.unregister();
