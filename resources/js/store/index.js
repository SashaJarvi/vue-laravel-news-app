import Vue from 'vue';
import Vuex from 'vuex';
import articleModule from './modules/article';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: { articleModule },
    state: {
        slug: '',
    },
    mutations: {
        SET_SLUG(state, payload) {
            state.slug = payload;
        },
    },
    getters: {
        articleSlugReversed: state => state.slug.split('').reverse().join('')
    }
});

export default store;
