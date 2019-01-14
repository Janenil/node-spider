<template>
  <section class="container">
    <h2 class="info" v-if="name === 'client'">
      这个页面从prefetch而来，刷新页面重服务器重新拉取页面
    </h2>
    <p class="intro">
      说明：
      - 使用postcss插件postcss-px-to-viewport进行适配，单位为vw<br />
      - 接口路由请查看server文件下的controllers
    </p>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
  </section>
</template>
<script>
export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

<style scoped>
.intro
{
  margin-top: 50px;
  font-size: 24px;
}
.info
{
  font-weight: 300;
  color: #888;
  margin: 0;
  margin-top: 10px;
  font-size: 36px;
}
.button
{
  margin-top: 50px;
}
</style>
