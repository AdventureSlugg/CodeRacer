<template>
	<div class="programming-interface">
		<table>
			<tbody>
				<tr v-for="line in lines" :key="line">
					{{ line }}
				</tr>
			</tbody>
		</table>
		<textarea id="codeContent"></textarea>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const lines = ref([])

const calculateLineCount = () => {
	const codeContentHeight = document.getElementById("codeContent").offsetHeight - 8;
	const lineCount = Math.floor(codeContentHeight / 22)
	lines.value = Array.from({length: lineCount}, (_, i) => i + 1)
}

onMounted( () => {
	calculateLineCount()
})
</script>

<style scoped>
.programming-interface {
	height: 100%;
	display: flex;
	background-color: #24202a;
	table {
		width: 5rem;
		color: #C0C0C0;
		tr {
			text-align: center;
		}
	}

	textarea {
		width: calc(100% - 8px);
		height: calc(100% - 8px);
		background-color: #181720;
		color: #C0C0C0;
		resize: none;
	}
}
</style>