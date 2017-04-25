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

    get(url, options) {

        return new Promise((resolve, reject)=> {

            if (options && options.hasOwnProperty('expireIn')) {

                let cached = this.storage.pull(url);

                if (cached && this.validate(url, this.storage.index[url])) {

                    resolve(cached);

                } else {

                    this.request.get(url).then((data)=> {
                        resolve(data);
                        this.set(url, data, options);
                    })

                }


            } else {

                this.request.get(url).then((response)=> {
                    resolve(data);
                    this.set(url, data, options);
                })

            }


        });

    }

    validate(key, object) {

        if (object && object.hasOwnProperty('expired')) {

            if (0 != object.expireIn && this.time > object.expired) {
                this.storage.remove(key);
                return 0;

            } else {
                return 1;
            }

        }

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
