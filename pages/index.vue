<template>
<section class="container">
  <h4 class="title">
    众成翻译文章列表
  </h4>
  <div v-for="(item, index) in data" :key="index" class="article-wrapper">
    <a href="javascript:;" @click="handleRequestArticle(item.link)" class="article-link">{{item.pageNum}} - {{item.title}}</a>
  </div>
  <button @click="handlePagination('prev')">上一页</button>
  <button @click="handlePagination('next')">下一页</button>
</section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      data: undefined,
      page: 1
    }
  },
  methods: {
    async handleRequestArticle(link) {
      const {
        data
      } = await axios.get('/api/articleContent', {
        params: {
          link: link
        },
        proxy: {
          host: '127.0.0.1',
          port: 3000
        }
      })
      console.log(data)
      this.$store.commit('STORE_ARTICLE', data)
      this.$router.push('/content')
    },
    async handlePagination(type) {
      type === 'prev' ? this.page-- : this.page++
      if (this.page <= 0) {
        return false
      }
      await this.getArticles()
    },
    async getArticles() {
      const {
        data
      } = await axios.get(
        '/api/articles', {
          params: {
            page: this.page
          },
          proxy: {
            host: '127.0.0.1',
            port: 3000
          }
        })
      for (let i = 0, len = data.length; i < len; i++) {
        if (this.page === 1) {
          data[i].pageNum = i + 1
        } else {
          data[i].pageNum = `${this.page - 1}${i + 1}`
        }
      }
      this.data = data
    }
  },
  async asyncData() {
    const {
      data
    } = await axios({
      url: '/api/articles',
      method: 'get',
      data: {
        page: 1
      },
      proxy: {
        host: '127.0.0.1',
        port: 3000
      }
    })
    for (let i = 0, len = data.length; i < len; i++) {
      data[i].pageNum = i + 1
    }
    return {
      data
    }
  }
}
</script>

<style scoped>
.title {
  margin: 50px 0;
}

.article-wrapper {
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding: 20px 50px;
}
</style>
