const _ = require('lodash');
const Promise = require('bluebird');
const Utilities = require('../utilities');
const { ERROR_LIST } = require('./constants');


class Base {
    constructor(ctx, next) {
        this.ctx = ctx;
        this.next = next;

        this.models = Utilities.Registry._get("models");
        this.schemas = Utilities.Registry._get("schemaList");
        this.env = Utilities.Registry._get("env");
        this.config = Utilities.Registry._get("config");

        this.user = null;
        this.admin = null;

        this._beforeMethod = {};
        this._afterMethod = {};

        this.error = null;
    };
    // error handling here...
    throwError(code, message = null) {
        let err = ERROR_LIST[code];
        if (!err) { // if error is not present in errorList in that case throw internal server issue...
            throw new Error("Some Internal Server Issue..");
        };
        if (message) { // if message is present in error in that case return the error with the mesaage..
            err.message = message;
        };
        this.error = err;
        throw new Error(err.codeMsg);
    }

    // function which is going to run before middleware for different routes...

    // execute before middleware....
    async _executeBefore(methodName) {
        if (_.size(this._beforeMethod) == 0 || !this._beforeMethod[methodName] || _.size(this._beforeMethod[methodName]) == 0) {
            return;
        };
        await Promise.each(this._beforeMethod[methodName], async (m) => {
            await this[m]();
        });
    };


    // this is a method for for executing a particular method over here.....
    async execute(methodName, ...args) {
        try {
            await this._executeBefore(methodName);
            await this[methodName](args);
            // await this._executeAfter(methodName);
        } catch (error) {
            if (this.error) {
                this.ctx.status = this.error.statusCode || 400;
                this.ctx.body = {
                    success: true,
                    error: this.error
                };
                return;
            };

            throw new Error(error);
        }

    }
};


module.exports = Base;




