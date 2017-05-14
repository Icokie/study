import IDB from '../dev/iDB';

// var cb = new CacheBox({type: 'local'});
// cb.get('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css').then((data) => {
//     let style = document.createElement('style');
//     let code = document.createTextNode(data);
//     style.appendChild(code);
//     document.body.appendChild(style);
// });

// var tcb  = new CacheBox({type: 'session'});
// tcb.get('https://code.jquery.com/jquery-3.2.1.min.js?').then((data) => {
//
//     tcb.exec(data).then(()=> {
//
//         $('#app').html('<button class="btn btn-default">click me</button>');
//
//     });
//
// });


// setInterval(()=>{
//     tcb.get('https://code.jquery.com/jquery-3.2.1.min.js?'+new Date());
//     console.log(new Date())
// }, 500);


//indexed db
let stores = [
    {name: 'externalLibs', options: {keyPath: 'id'}},
    {name: 'employee', options: {keyPath: 'id'}}
];

const DB = new IDB();
DB.createDB('test').then((data)=>{console.log(data)});



//
// isIDBSupported().then(() => {
//
//     return createIDB('myDB', 3, stores);
//
// }).then((db)=> {
//
//     addToIDBStore(db, 'employee', {id:3 , name: 'kaysd'});
//     readFromIDBStore(db, 'employee', 2).then((data)=>{
//         console.log('reading: ', data);
//     });
//     removeFromIDBStore(db, 'employee', 2);
//
// });

//=======================================================/
// checking for IDB support
//=======================================================/
function isIDBSupported() {

    return new Promise((resolve, reject)=> {

        window.IDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        window.IDB ? resolve(1) : reject(0);

    });

}
//======== end of checking for IDB support block ========\

//=======================================================/
// create new IDB
//=======================================================/
function createIDB(name, version, stores = [{name: 'main', options: {keyPath: 'id'}}]) {

    return new Promise((resolve, reject)=> {

        let request = window.IDB.open(name, version || 1);

        request.onerror = (event) => {

            reject(event.target.error);

        };

        request.onsuccess = (event) => {

            resolve(event.target.result);

        };

        request.onupgradeneeded = (event) => {

            let db = event.target.result;
            stores.forEach((store) => {

                db.createObjectStore(store.name, store.options);

            });

        }

    });


}
//======== end of create new IDB block ==================\

//=======================================================/
// add to IDB store
//=======================================================/
function addToIDBStore(db, name, data) {

    return new Promise((resolve, reject)=> {

        let transaction = db.transaction([name], "readwrite");
        let writer = transaction.objectStore(name).add(data);

        writer.onerror = (event) => {
            reject(event.target.error);
        };

        writer.onsuccess = (event) => {

            resolve(event.target.result);

        }

    });

}
//======== end of add to IDB store block ================\

//=======================================================/
// read from IDB store
//=======================================================/
function readFromIDBStore(db, name, key) {

    return new Promise((resolve, reject)=>{

        let transaction = db.transaction([name]);
        let writer = transaction.objectStore(name).get(key);

        writer.onerror = () => {

            reject('reading from store error');

        };

        writer.onsuccess = (event) => {

            resolve(event.target.result);

        }

    });

}
//======== end of read from IDB store block =============\

//=======================================================/
// remove from IDB store
//=======================================================/
function removeFromIDBStore(db, name, key) {

    return new Promise((resolve, reject)=> {

        let transaction = db.transaction([name], "readwrite");
        let writer = transaction.objectStore(name).delete(key);

        writer.onerror = (event) => {
            reject(event.target.error);
        };

        writer.onsuccess = (event) => {

            resolve(event.target.result);

        }

    });

}
//======== end of remove from IDB store block ===========\


