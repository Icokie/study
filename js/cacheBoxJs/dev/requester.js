'use strict';

export default class Requester {

    /**
     * @description get response from url
     * @param url
     * @param async
     * @returns {Promise}
     */

    get(url, async) {

        return new Promise((resolve, reject) => {

            let request = new XMLHttpRequest();

            request.open('get', url, async || true);
            request.send();

            request.onload = (response) => {
                resolve(response.target.response);
            };

            request.onerror = (response) => {
                reject(response);
            };

        });

    }

}
