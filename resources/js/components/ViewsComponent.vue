<template>
    <span class="badge bg-danger">{{ articleViews }} <i class="far fa-eye"></i></span>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ViewsComponent',
    computed: {
        ...mapGetters(['articleViews'])
    }
};
</script>

<style scoped>

</style>
