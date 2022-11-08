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
        ...mapState(['slug', 'likeIt']),
        ...mapGetters(['articleLikes']),
    },
    methods: {
        addLike() {
            this.$store.dispatch('likesIncrement', {
                slug: this.slug,
                increment: this.likeIt
            });
        }
    }
};
</script>

<style scoped>

</style>
