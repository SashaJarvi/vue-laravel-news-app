<template>
    <span
        class="badge bg-primary"
        :class="likeIt ? 'bg-primary' : 'bg-danger'"
        @click="addLike"
    >{{ articleLikes }} <i class="far fa-thumbs-up"></i>
    </span>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
    name: 'LikesComponent',
    computed: {
        ...mapState(['slug', 'articleModule/likeIt']),
        ...mapGetters('articleModule', ['articleLikes']),
        slug() {
            return this.$store.state.slug;
        },
        likeIt() {
            return this.$store.state.articleModule.likeIt;
        },
    },
    methods: {
        addLike() {
            this.$store.dispatch('articleModule/likesIncrement', {
                slug: this.slug,
                increment: this.likeIt
            });
        }
    }
};
</script>

<style scoped>

</style>
