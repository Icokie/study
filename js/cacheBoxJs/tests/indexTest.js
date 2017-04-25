import CacheBox from '../dev/cacheBox';


var cb = window.cb = new CacheBox();

console.info(window.cb);

cb.get('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',{expireIn: 10000}).then((data) => {
    let style = document.createElement('style');
    let code = document.createTextNode(data);
    style.appendChild(code);
    document.body.appendChild(style);
});


cb.get('https://code.jquery.com/jquery-3.2.1.min.js?',{expireIn: 10000}).then((data) => {

    cb.exec(data).then(()=>{

        $('#app').html('<button class="btn btn-default">click me</button>');

    });

});

cb.get('https://code.jquery.com/jquery-3.2.1.min.js?3216',{expireIn: 5000}).then((data) => {

    cb.exec(data).then(()=>{

        $('#app').html('<button class="btn btn-default">click me</button>');

    });

});
