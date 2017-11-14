import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.react';
import registerServiceWorker from './registerServiceWorker';

// Render entry point of app into DOM
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
