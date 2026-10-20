<script setup lang="ts">
import { nextTick, ref, type InputHTMLAttributes } from 'vue'
import BaseModal from './BaseModal.vue'

const confirmOpen = ref(false)
const searchOpen = ref(false)

const keyword = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

function confirmDelete() {
	// 执行删除逻辑
	console.log('删除')
	confirmOpen.value = false
}

async function onSearchOpened() {
	await nextTick()
	searchInput.value?.focus()
}

function onSearch() {
	console.log('搜索：', keyword.value)
	searchOpen.value = false
}
</script>

<template>
	<button type="button" @click="confirmOpen = true">删除文章</button>
	<button type="button" @click="searchOpen = true">搜索</button>

	<!-- 确认弹窗：内容 + footer 插槽 -->
	<BaseModal v-model:open="confirmOpen" title="确认删除？">
		<p>删除后无法恢复，确定要删除这篇文章吗？</p>

		<template #footer>
			<button type="button" @click="confirmOpen = false">取消</button>
			<button type="button" class="danger" @click="confirmDelete">
				确认删除
			</button>
		</template>
	</BaseModal>

	<!-- 搜索弹窗：模态 + 点外面关闭（BaseModal 默认行为） -->
	<BaseModal v-model:open="searchOpen" title="搜索文章" @opened="onSearchOpened">
		<div class="card">
			<header>
				<img src="/src/assets/images/search-button.svg" alt="">
				<input
					type="text"
					placeholder="搜索..."
					@input="e => console.log((e.target as InputHTMLAttributes).value)"
				/>
			</header>
		</div>
		<!-- <form @submit.prevent="onSearch">
			<label for="search-input" class="visually-hidden">关键词</label>
			<input id="search-input" ref="searchInput" v-model="keyword" type="search" placeholder="输入关键词…" />
			<button type="submit">搜索</button>
		</form> -->
	</BaseModal>
</template>

<style scoped lang="less">
.card {
	width: 70vw;
	height: 400px;

	background-color: #fff;
	border-radius: 12px;

	> header {
		display: flex;
		gap: 10px;
		padding: 10px;
		border-bottom: 1px #dddddd solid;

		> img {
			width: 30px;
			height: 30px;
			flex-shrink: 0;
		}
		> input {
			flex: 1;
			border: none;
			outline: none;
		}
	}
}
</style>
