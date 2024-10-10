const _ = require('lodash');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const env = process.env.NODE_ENV || 'sample';
const Utilities = require('./src/utilities');

// requirinng config files...
const config = require(`./config/env/${env}.config.json`);
Utilities.Registry._set("config", config);
Utilities.Registry._set("env", env);


// creating mongo connection..
const mongoDbConnection = (new Utilities.Client.MongoDB.Client(Utilities.Registry._get("config")["mongo_instances"]["primary_1"], {})).connect();
Utilities.Registry._set("monogoDB", mongoDbConnection);


// importing all schemas...
const schemaList = require('./src/models');
Utilities.Registry._set('schemaList', schemaList);


// generating all models...
let models = {};
_.each(schemaList, (value, key) => {
    models[key] = mongoDbConnection.model(key, value.Schema);
});
Utilities.Registry._set("models", models);


// initializing the app..
const app = new Koa();

// koa body middleware..
app.use(koaBody());
require('koa-qs')(app, 'extended');

// cors moddleware...
app.use(async (ctx, next) => {
    try {
        const allowedOrigins = ['http://localhost:5174']; // Add your allowed origins here
        const origin = ctx.request.header.origin;

        if (allowedOrigins.includes(origin)) {
            ctx.set('Access-Control-Allow-Origin', origin);
        }
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        ctx.set('Access-Control-Allow-Credentials', 'true')
        await next();
    } catch (error) {
        console.log('Process.Error', error);
        ctx.status = error.status || 500;
        ctx.body = {
            success: false,
            error: { message: 'Internal Server error, dev team has been notified. Please try again after sometime!!' }
        };
        ctx.app.emit('error', error);
    }
});


// all routes...
const routeList = require('./src/routes');
_.each(routeList, (r, key) => {
    app.use(r.routes());
    app.use(r.allowedMethods());
});


app.listen(config.application.port || 400, () => {
    console.log(`Server is listening on port ${config.application.port}- - - - - - - - -`);
});
