export default class IDB {

    //=======================================================/
    // create new IDB
    //=======================================================/
    createDB(name, version, stores = [{name: 'main', options: {keyPath: 'id'}}]) {

        return new Promise((resolve, reject)=> {

            isIDBSupported().then(()=> {

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


            }).catch((error)=>{

               reject(error);

            });

        });

    }
    //======== end of create new IDB block ==================\

    //=======================================================/
    // add to store
    //=======================================================/
    add(name, data) {

        return new Promise((resolve, reject) => {

            let transaction = this.DB.transaction([name], "readwrite");
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

}

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
