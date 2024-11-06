<template>
	<div class="status">
		<p>
			Timer: {{ timer }} s
		</p>

		<p>
			Speed: {{ wordsPerMinute }} wpm
		</p>
		<p>
			Accuracy: {{ accuracy.toFixed(2) }} %
		</p>
		
	</div>
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
			<textarea id="codeContent" v-model="writtenCode" @input="updateStats()" @keydown="preventBackArrow"></textarea>
			<p id="accuracyOverlay">
				<span v-for="(char, index) in writtenCode" :key="index">
					<span :class="{
						'correct': writtenCode[index] === solutionCode[index],
						'incorrect': writtenCode[index] !== solutionCode[index]
					}">
						{{ solutionCode[index] }}
					</span>
				</span>
			</p>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineProps, computed, defineExpose } from 'vue';

const props = defineProps({
	codingChallenge: String,
})

const lines = ref([])
const solutionCode = computed(() => props.codingChallenge)
const writtenCode = ref('');

// Status
const wordsPerMinute = ref(0);
const timer = ref('00:00');
const accuracy = ref(0);
const totalTimeInSeconds = ref(0);

let timerInterval;
let incorrectChars = 0;
let hasStarted = false;

const updateStats = () => {
	if (hasStarted == false) {
		hasStarted = true;
		// Start the timer
		timerInterval = setInterval(() => {
			totalTimeInSeconds.value += 1;
			formatTime();
			calculateWPM();
		}, 1000);
	}
	updateAccuracy();

	// Stop the timer when the last character is correct
	if (writtenCode.value.length >= solutionCode.value.length && writtenCode.value[writtenCode.value.length - 1] == solutionCode.value[solutionCode.value.length - 1]) {
		clearInterval(timerInterval)
	}
}

const calculateWPM = () => {
	const wordCount = writtenCode.value.trim().split(/\s+/).length;
	const minutes = totalTimeInSeconds.value / 60;
	wordsPerMinute.value = minutes > 0 ? (wordCount / minutes).toFixed(2) : 0;
}

const updateAccuracy = () => {
	const lengthOfWrittenCode = writtenCode.value.length;

	// Reset incorrectChars
	incorrectChars = 0;

	// Calculate incorrect characters
	for (let i = 0; i < lengthOfWrittenCode; i++) {
		if (writtenCode.value[i] !== solutionCode.value[i]) {
			incorrectChars += 1;
		}
	}

	// Calculate accuracy, avoiding division by zero
	accuracy.value = (lengthOfWrittenCode > 0 
		? (lengthOfWrittenCode - incorrectChars) / lengthOfWrittenCode
		: 1) * 100;

	formatTime();
};

const calculateCompletionPercent = () => {

	return solutionCode.value.length ? ((writtenCode.value.length / solutionCode.value.length) * 100).toFixed(2) : 0;
}

const formatTime = () => {
	const minutes = Math.floor(totalTimeInSeconds.value / 60).toString().padStart(2, '0');
	const seconds = (totalTimeInSeconds.value % 60).toString().padStart(2, '0')

	timer.value = `${minutes}:${seconds}`
}

const generateLineNumbers = () => {
	const codeContentHeight = document.getElementById("codeContent").offsetHeight - 8;
	const lineCount = Math.floor(codeContentHeight / 22)
	lines.value = Array.from({length: lineCount}, (_, i) => i + 1)
}

const preventBackArrow = (event) => {
	if (event.key === 'ArrowLeft') {
		event.preventDefault();
	}
}

const resetGame = () => {
	// stop timer
	clearInterval(timerInterval);

	// end game
	hasStarted = false;

	// reset values
	writtenCode.value = ''
	wordsPerMinute.value = 0;
	timer.value = '00:00';
	accuracy.value = 0;
	totalTimeInSeconds.value = 0;
}

onMounted( () => {
	generateLineNumbers();
})

onUnmounted( () => {
	clearInterval(timerInterval);
})

defineExpose({ resetGame, calculateCompletionPercent });
</script>

<style scoped>
.programming-interface {
	position: relative;
	height: calc(90% - 4rem);
	display: flex;
	border-radius: 1rem;
	margin: 1rem;
	background-color: #1F1F1F;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
		color: rgba(0,0,0,0);
		background: rgba(0,0,0,0);
		resize: none;
		z-index: 200;
		position: absolute;
		padding: 8px;
		font-size: 22px;
		font-family: 'Courier New', Courier, monospace;
		border: none;
		white-space: pre-wrap;
		caret-color: rgba(255, 255, 255, 1) !important;
	}

	textarea:focus {
		outline: none;
	}

	#solutionCodeOverlay {
		width: calc(100% - 20px - 5rem);
		height: calc(100% - 20px);
		background-color: #1F1F1F;
		color: #dbdbdb;
		resize: none;
		z-index: 100;
		position: absolute;
		font-size: 22px;
		font-family: 'Courier New', Courier, monospace;
		white-space: pre-wrap;
	}

	#accuracyOverlay {
		width: calc(100% - 20px - 5rem);
		height: calc(100% - 20px);
		background: rgba(0,0,0,0);
		resize: none;
		z-index: 300;
		position: absolute;
		padding: 9px;
		font-size: 22px;
		font-family: 'Courier New', Courier, monospace;
		border: none;
		pointer-events: none;
		white-space: pre-wrap;
	}

	.correct {
		color: #00c81e;
	}

	.incorrect {
		color: #aa2f2f;
	}

	p {
		margin: 0;
		padding: 9px;
	}
}

.status {
	color: #00A2BE;
	text-align: right;
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	position: relative;
	height: 0rem;
	padding: 0rem;
	top: -2rem;
	p {
		margin: 0rem 1rem;
	}
}
</style>