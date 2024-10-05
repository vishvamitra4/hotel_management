class Registry {

    static instance = null;

    constructor() {
        if (Registry.instance) return Registry.instance;
        this.data = {};
        Registry.instance = this;
    };

    _set(key, value = null) {
        this.data[key] = value;
    };

    _get(key, defaultVal = null) {
        return (this.data.hasOwnProperty(key)) ? this.data[key] : defaultVal;
    };

    _delete(key) {
        delete this.data[key];
    };
};

module.exports = Registry.instance || new Registry();