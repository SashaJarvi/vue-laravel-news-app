import Vue from 'vue';
import Vuex from 'vuex';

import {asyncTimeout} from '../utils/async-timeout';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        article: {},
        slug: '',
        likeIt: true
    },
    mutations: {
        SET_ARTICLE(state, payload) {
            state.article = payload;
        },
        SET_SLUG(state, payload) {
            state.slug = payload;
        },
        SET_LIKE(state, payload) {
            state.likeIt = payload;
        }
    },
    actions: {
        async getArticleData({commit}, payload) {
            try {
                const response = await axios.get('/api/article-json', {params: {slug: payload}});
                commit('SET_ARTICLE', response.data.data);
            } catch (e) {
                console.error(e);
            }
        },
        async likesIncrement({commit, state}, {slug, increment}) {
            try {
                const response = await axios.put('/api/article-likes-increment', { slug, increment });
                commit('SET_ARTICLE', response.data.data);
                commit('SET_LIKE', !state.likeIt);
            } catch (e) {
                console.error(e);
            }
        },
        async viewsIncrement({commit}, payload) {
            try {
                await asyncTimeout(5000);
                const response = await axios.put('/api/article-views-increment', {slug: payload});
                commit('SET_ARTICLE', response.data.data);
            } catch (e) {
                console.error(e);
            }
        }
    },
    getters: {
        articleViews: state => state.article.stats && state.article.stats.views,
        articleLikes: state => state.article.stats && state.article.stats.likes,
    }
});

export default store;
