import Requester from './requester';
import Storage from './storage';

export default  class CacheBox {

    constructor() {

        this.request = new Requester();
        this.storage = new Storage();
        this.cache = 1;

    }

    dataLoad(url, cache) {

        return new Promise((resolve, reject)=>{

            let data = this.storage.pull(url);


            if(cache || this.cache && data) {

                resolve(data);

            } else {

                this.request.get(url).then((data)=> {

                    this.storage.push(url, data.response);

                    resolve(data.response);

                });

            }

        });

    }

    dataExec(data) {

        return new Promise((resolve, reject) => {

            let src;

            if('string' == typeof data) {

                src = new Function(data);
                src();

            }

            resolve(src);

        });

    }

}
