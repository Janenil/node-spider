const router =  require('koa-router')();
const getApiFiles = require('../util/getApiFiles');

class AutoRouter {
  constructor(options, app) {
    this.options = options;
    this.app = app;
  }
  auto() {
    const jsFiles = getApiFiles();
    for (let item of jsFiles) {
      const name = item.substring(0, item.length - 3);
      const selfRouter = require('../server/controllers/' + item);
      router.use('/' + name, selfRouter.routes(), selfRouter.allowedMethods());
      this.app.use(selfRouter.routes(), selfRouter.allowedMethods())
    }
  }
}

module.exports = AutoRouter
