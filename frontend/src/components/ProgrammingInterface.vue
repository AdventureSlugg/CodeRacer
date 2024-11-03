<template>
	<div class="programming-interface">
		<table>
			<tbody>
				<tr v-for="line in lines" :key="line">
					{{ line }}
				</tr>
			</tbody>
		</table>

		<div>
			<p id="solutionCodeOverlay"> {{ solutionCode }} </p>
			<textarea id="codeContent"></textarea>
		</div>
		
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const lines = ref([])
const solutionCode = '// This is the solution'

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
	position: relative;
	height: 100%;
	display: flex;
	background-color: #1F1F1F;
	table {
		width: 5rem;
		color: #C0C0C0;
		tr {
			text-align: center;
		}
	}

	textarea {
		width: calc(100% - 20px - 5rem);
		height: calc(100% - 20px);
		color: #C0C0C0;
		background: rgba(0,0,0,0);
		resize: none;
		z-index: 200;
		position: absolute;
		padding: 8px;
		font-size: 22px;
		font-family: 'Courier New', Courier, monospace;
		border: none
	}

	textarea:focus {
		outline: none;
	}

	#solutionCodeOverlay {
		width: calc(100% - 20px - 5rem);
		height: calc(100% - 20px);
		background-color: #1F1F1F;
		color: #4b4b4b;
		resize: none;
		z-index: 1;
		position: absolute;
		font-size: 22px;
		font-family: 'Courier New', Courier, monospace;
	}

	p {
		margin: 0;
		padding: 9px;
	}
}
</style>