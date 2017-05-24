import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {App} from '../app/containers/App';

function renderComponent(data) {
    
    return new Promise((resolve, reject) => {
     
        let component = ReactDOMServer.renderToString(<App data={data}/>);
        
        resolve(component);
        
    });
    
}

export {renderComponent};