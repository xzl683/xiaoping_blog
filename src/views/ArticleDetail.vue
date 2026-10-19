<script setup lang="ts">
import { computed } from 'vue';
import Nav from '@/components/Nav.vue';
import { useArticlesStore } from '@/composables/useArticlesStore.ts';
import Article from './Article.vue';

const { articles } = useArticlesStore();

const url = new URL(window.location.href);

const article = computed(() => articles.value.find(a => a.id === url.searchParams.get('id'))!);
</script>

<template>
    <Nav />

    <Article :article="article"/>
</template>