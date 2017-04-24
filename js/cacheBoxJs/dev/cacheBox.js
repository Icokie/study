import Requester from "./requester";
import Storage from "./storage";

export default  class CacheBox {

    constructor() {

        this.request = new Requester();
        this.storage = new Storage();
        this.time = new Date().getTime();

    }


    set(key, data, options) {
        return new Promise((resolve, reject) => {

            // adding time
            options.added = this.time;

            // adding expiration time
            if (options.hasOwnProperty('expireIn')) {
                options.expired = this.time + options.expireIn;
            }

            this.storage.push(key, data, options);
            resolve(data);

        });
    }

    get(url, cache) {
        return new Promise((resolve, reject)=> {

            if (cache) {

                let data = this.storage.pull(url);

                if (data) {

                    resolve({data: data, status: 1});

                } else {

                    this.request.get(url).then((data)=> {
                        resolve({data: data.response, status: 0});
                    });

                }


            } else {

                this.request.get(url).then((data)=> {
                    resolve({data: data.response, status: 0});
                });

            }

        });
    }

    load(url, cache, options) {

        return new Promise((resolve, reject)=> {

            this.get(url, cache).then((response)=> {

                if (1 == response.status) {

                    resolve(response.data);

                } else {

                    resolve(response.data);
                    this.set(url, response.data, options);

                }

            });

        });

    }

    exec(data) {

        return new Promise((resolve, reject) => {

            let src;

            if ('string' == typeof data) {

                src = new Function(data);
                src();

            }

            resolve(src);

        });

    }

}
