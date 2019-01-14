const filter = () => {
  return async (ctx, next) => {
    // 需要自己定义的过滤器
    await next()
  }
}

module.exports = filter