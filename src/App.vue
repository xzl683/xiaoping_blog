<script setup lang="ts">
import Nav from '@/components/Nav.vue';
import Search from '@/components/Search.vue';
import ToastHost from '@/components/ToastHost.vue';
</script>

<template>
	<Nav />
	<router-view />
	<Search />
	<ToastHost />
</template>
