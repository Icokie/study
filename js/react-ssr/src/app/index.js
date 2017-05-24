import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {getResponse} from './utils/apiLoader';
import config from '../../config/conf';

import {App} from './containers/App';

getResponse(location.href, {headers: config.apiProxy.headers}).then((data)=> {
    
    ReactDOM.render(<App data={data}/>, document.getElementById('app'));
    
});



