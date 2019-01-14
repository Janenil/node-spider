<template>
<div class="content">
  <h1>{{article.title}}</h1>
  <div class="content-wrapper" ref="content"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: '',
        content: ''
      }
    }
  },
  beforeMount() {
    const {
      title,
      content
    } = this.$store.state.article
    this.article = {
      title: title,
      content: content
    }
  },
  mounted() {
    this.$refs['content'].innerHTML = this.article.content
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  width: 100%;
  position: relative;

  .content-wrapper {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
<style lang="less">
.content-wrapper {
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  code {
    display: block;
    font-family: Consolas, monaco, monospace;
    color: #f0506e;
    padding: 2px 6px;
    background: #f8f8f8;
  }
}
</style>
