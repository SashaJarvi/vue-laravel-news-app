import {asyncTimeout} from '../../utils/async-timeout';

const articleModule = {
    namespaced: true,
    state: () => ({
        article: {},
        likeIt: true,
        commentSuccess: false,
        errors: {}
    }),
    mutations: {
        SET_ARTICLE(state, payload) {
            state.article = payload;
        },
        SET_LIKE(state, payload) {
            state.likeIt = payload;
        },
        SET_COMMENT_SUCCESS(state, payload) {
            state.commentSuccess = payload
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
        },
        async addComment({ commit, dispatch, state, rootState }, { subject, body, article_id }) {
            try {
                await axios.post('/api/article-add-comment', { subject, body, article_id });
                commit('SET_COMMENT_SUCCESS', !state.commentSuccess);
                dispatch('getArticleData', rootState.slug);
            } catch (e) {
                if (e.response && e.response.status === 422) {
                    state.errors = e.response.data.errors
                }
            }
        }
    },
    getters: {
        articleViews: state => state.article.stats && state.article.stats.views,
        articleLikes: state => state.article.stats && state.article.stats.likes,
        comments: state => state.article.comments,
        commentSuccess: state => state.commentSuccess,
        errorsMessage: state => state.errors
    }
}

export default articleModule;
