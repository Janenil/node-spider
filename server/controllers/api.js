const Router = require('koa-router')
const router = new Router()
const request = require('request')
const cheerio = require('cheerio')

const getArticles = (ctx) => {
  const { page = 1 } = ctx.query
  return new Promise((resolve) => {
    request.get({
      url: `https://www.zcfy.cc/?page=${page}&mode=loadmore`
    }, (err, res, body) => {
      let data = []
      const $ = cheerio.load(body)
      $('.uk-card').each(function () {
        if ($(this).find('h4').length != 0) {
          let obj = {
            title: $(this).find('h4').text().trim(),
            link: `https://www.zcfy.cc${$(this).find('h4').parent().attr('href')}`
          }
          data.push(obj)
        }
      })
      resolve(data)
    })
  })
}

const getArticleContent = (ctx) => {
  const { link } = ctx.query
  return new Promise((resolve) => {
    request.get({
      url: link
    }, (err, res, body) => {
      const $ = cheerio.load(body)
      const article = {
        title: $('.detail-title').text(),
        content: $('.markdown-body').html()
      }
      resolve(article)
    })
  })
}

const articles = async (ctx, next) => {
  const _articles = await getArticles(ctx)
  ctx.body = _articles
}

const articleContent = async (ctx, next) => {
  const _articleContent = await getArticleContent(ctx)
  ctx.body = _articleContent
}

router.get('/articles', articles)
router.get('/articleContent', articleContent)
module.exports = router
