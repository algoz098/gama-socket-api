require('dotenv-safe').load()
require('colors')

const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const formidable = require('koa2-formidable')

const router = new Router()
require('./app/routes.js')(router)

const storage = require('./storage')
const locales = require('./locales')

require('./app/model/index.js')

require('./globals/index')

const server = require('http').Server(app.callback())

app.use (formidable({}))
app.use(bodyParser())
app.use(cors())
app.use(router.routes())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// Route for static files
storage(app)
// Locales files
locales(app)

app.on('error', (err, ctx) => {
  ctx.status = err.statusCode || err.status || 500
  ctx.body = err.details || err
})

const io = require('socket.io')(server, {
  handlePreflightRequest: function(req, res) {
      var headers = {
          'Access-Control-Allow-Headers': 'Content-Type, authorization',
          'Access-Control-Allow-Origin': req.headers.origin,
          'Access-Control-Allow-Credentials': true
      };
      res.writeHead(200, headers);
      res.end();
  }
});
require('./app/socket-routes.js')(io);


// Start the server
server.listen(process.env.PORT)

// eslint-disable-next-line no-console
console.log(`Now running in: ${process.env.URL}:${process.env.PORT}`.bgGreen.black)

module.exports = server