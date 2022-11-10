<template>
    <div class="row">
        <form v-if="!commentSuccess" @submit.prevent="addComment">
            <div class="mb-3">
                <label for="commentSubject" class="form-label">Тема комментария</label>
                <input v-model="subject" type="text" class="form-control" id="commentSubject">
                <div v-if="errorsMessage.subject" class="alert alert-danger" role="alert">{{ errorsMessage.subject[0] }}</div>
            </div>

            <div class="mb-3">
                <label for="commentBody" class="form-label">Тема комментария</label>
                <textarea v-model="body" class="form-control" id="commentBody" rows="3"></textarea>
                <div v-if="errorsMessage.body" class="alert alert-danger" role="alert">{{ errorsMessage.body[0] }}</div>
            </div>

            <button class="btn btn-success">Отправить</button>
        </form>

        <div v-else class="alert alert-success" role="alert">
            Комментарий успешно отправлен
        </div>

        <div class="toast-container position-relative pb-5 mt-5 mx-auto w-100">
            <div v-for="(comment, index) in comments" :key="`comment_${index + 1}`" class="toast show w-100">
                <div class="toast-header">
                    <img src="https://via.placeholder.com/50/5F113B/FFFFFF/?text=User" class="rounded me-2" alt="...">
                    <strong class="me-auto">{{comment.subject}}</strong>
                    <small class="text-muted">{{comment.created_at}}</small>
                </div>
                <div class="toast-body">
                    {{comment.body}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CommentsComponent',
    data: () => ({
        subject: '',
        body: ''
    }),
    computed: {
        ...mapGetters('articleModule', ['comments', 'commentSuccess', 'errorsMessage']),
        articleId() {
            return this.$store.state.articleModule.article.id;
        }
    },
    methods: {
        addComment() {
            this.$store.dispatch('articleModule/addComment', {
                subject: this.subject,
                body: this.body,
                article_id: this.articleId
            })
        }
    }
};
</script>

<style scoped>

</style>
