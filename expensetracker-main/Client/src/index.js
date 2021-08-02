import React from '../node_modules/react'; // tu zamian 
import ReactDOM from '../node_modules/react-dom';
import { BrowserRouter } from '../node_modules/react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
