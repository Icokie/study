module.exports = {
    
    backendPort: 3030,
    
    apiProxy: {
        host: 'http://loc.clients',
        img: 'https://spishy.net',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    },
    
    cache: {
        back: {cache: true, expires: 30000},
        front: {cache: true, expires: 30000}
    },
    
    babelPresets: ['es2015', 'stage-0', 'react']
    
};
