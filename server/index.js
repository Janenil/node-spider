import Koa from 'koa'
import AutoRouter from '../lib/autoRouter'
import { Nuxt, Builder } from 'nuxt'
import options from '../config'
import bodyParser from 'koa-bodyparser'
const filter = require('./filter')
const start = async () => {
  const app = new Koa()
  const host = options.host
  const port = options.port// config.port

  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(filter()) // 路由过滤
  app.use(bodyParser())
  new AutoRouter(null, app).auto()
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}

start()
