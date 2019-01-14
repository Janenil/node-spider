import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => (new Vuex.Store({
    state: {
      acticle: {
        title: '',
        content: ''
      }
    },
    mutations: {
      STORE_ARTICLE(state, data) {
        state.article = {
          title: data.title,
          content: data.content
        }
      }
    }
}))

export default store;