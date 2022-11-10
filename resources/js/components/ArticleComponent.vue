<template>
    <div class="row mt-5">
        <div class="col-12 p-3">
            <img :src="article.img" alt="" class="border rounded mx-auto d-block">
            <h5 class="mt-5">{{ article.title }}</h5>
            <div class="d-flex mb-4">
                <div v-for="(tag, index) in article.tags" :key="`tag_${index}`">
                    <span v-if="tagsLength === index + 1" class="tag">{{ tag.label }}</span>
                    <span v-else class="tag">{{ tag.label }} |</span>
                </div>
            </div>
            <p class="card-text">{{ article.body }}</p>
            <p>Опубликовано: <i>{{ article.created_at }}</i></p>
            <div class="mt-3">
                <views-component></views-component>
                <likes-component></likes-component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleComponent',
    components: {},
    computed: {
        article() {
            return this.$store.state.articleModule.article;
        },
        tagsLength() {
            return this.article.tags.length;
        }
    }
};
</script>

<style scoped>

</style>
