import config from '../../../config/conf';
import requestify from 'requestify';


function getResponse(url, options = {headers: config.apiProxy.headers}) {
    
    return new Promise((resolve, reject)=> {
        
        requestify.get(url, options).then((response)=> {
            
            let data = response.getBody();
            
            resolve(data, response);
            reject(response.getCode());
        });
        
    });
    
}

export {getResponse};