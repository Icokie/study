export default class Storage {

    constructor() {

        this.storage = window.localStorage || 0;

        if (this.storage) {

            this.index = this.storage.getItem('cacheBoxIndex');

            if (this.index) {

                this.index = JSON.parse(this.index);

            } else {
                this.index = {};
            }

        }

    }

    push(key, value, options) {

        if (this.storage) {
            this.storage.setItem(key, value);
            this.updateIndex(key, options);
        }

    }

    pull(key) {
        return this.storage && this.storage.getItem(key);
    }

    remove(key) {
        if (this.storage) {
            this.storage.removeItem(key);
            delete this.index[key];
            this.updateIndex();
        }
    }

    updateIndex(key, value) {

        if (key) {
            this.index[key] = value || null;
        }

        this.storage.setItem('cacheBoxIndex', JSON.stringify(this.index));

    }

}
