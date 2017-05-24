/*global __dirname*/

let config = require('../../config/conf'),
    path = require('path'),
    express = require('express'),
    requestify = require('requestify'),
    app = express();


//-------------------------------------------------------------+
// babelify
//-------------------------------------------------------------+
require('babel-register')({
    presets: config.babelPresets
});

var reactApp = require('./index');

//---------------------------babelify ends here----------------+


let headers = {
    'x-timestamp': Date.now(),
    'x-sent': true
};


app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname));


//-------------------------------------------------------------+
// disable favicon
//-------------------------------------------------------------+
app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});
//--------------------disable favicon ends here----------------+


app.get('/build/:name', function (req, res, next) {
    var options = {
        root: path.resolve(__dirname, '../../public/build'),
        dotfiles: 'deny',
        headers: headers
    };
    
    res.sendFile(req.params.name, options, function (err) {
        if (err) {
            next(err);
        }
    });
    
});

app.get('*', (req, res) => {
    
    requestify.get(config.apiProxy.host + req.url, {cache: config.cache.back, headers: config.apiProxy.headers})
        .then((response) => {
            
            let data = response.getBody();
            
            if ('XMLHttpRequest' == req.get('X-Requested-With')) {
                
                res.json(data);
                
            } else {
                
                reactApp.renderComponent(data).then((component) => {
                    res.render('index', {data: data, meta:data.meta, content: component});
                    
                });
                
                
            }
            
        });
    
    
});


//-------------------------------------------------------------+
// starting server at
//-------------------------------------------------------------+
app.listen(config.backendPort, console.log(`backend at : ${config.backendPort}`));
//-----------------starting server at ends here----------------+