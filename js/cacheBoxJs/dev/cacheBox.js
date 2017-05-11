import Requester from "./requester";
import Storage from "./storage";

export default  class CacheBox {

    constructor(options) {

        this.request = new Requester();
        this.storage = new Storage(options || {type: 'local'});
        this.time = new Date().getTime();

    }


    set(key, data, options) {
        return new Promise((resolve, reject) => {

            // adding time
            options.added = this.time;

            // adding expiration time
            if (options.hasOwnProperty('expire')) {
                options.expired = this.time + options.expire;
            }

            this.storage.push(key, data, options);
            resolve(data);

        });
    }

    get(url, options = {expire: 0}) {

        return new Promise((resolve, reject)=> {

            if (options && options.hasOwnProperty('expire')) {

                let cached = this.storage.pull(url);

                if (cached && this.validate(url, options, this.storage.index[url])) {

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

    validate(key, options, indexOptions) {

        if (indexOptions && indexOptions.hasOwnProperty('expired')) {

            if (options.expire == indexOptions.expire) {

                if (0 != options.expire && this.time > indexOptions.expired) {

                    this.storage.remove(key);
                    return 0;

                } else {

                    return 1;

                }

            } else {

                this.storage.remove(key);
                return 0;

            }

        } else {

            this.storage.remove(key);
            return 0;

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
