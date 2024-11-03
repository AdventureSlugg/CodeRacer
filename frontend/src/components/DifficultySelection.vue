<template>
	<div class="difficulty-selection">
		<button class="easy difficulty-btn" @click="setDifficulty('easy')">
			Easy
		</button>
		<button class="medium difficulty-btn" @click="setDifficulty('medium')">
			Medium
		</button>
		<button class="hard difficulty-btn" @click="setDifficulty('hard')">
			Hard
		</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// The difficulty level is set to easy by default
const difficulty = ref('easy');

const setDifficulty = (selectedDifficulty) => {
	difficulty.value = selectedDifficulty;
}

</script>

<style scoped>
.difficulty-selection {
	height: 10%;
	display: flex;
	align-items: center;
	margin-left: 2rem;
}

.difficulty-btn {
	width: 15rem;
	height: 3.5rem;
	border: none;
	margin-right: 2rem;
	font-size: 28px;
	color: white;
	font-weight: bold;
	border-radius: 1rem;
}
.easy {
	background-color: #38D04A;
}

.easy:hover {
	background-color: #84da8f;
}

.easy:active {
	background-color: #27ae37;
}

.medium {
	background-color: #D0A838;
}

.medium:hover {
	background-color: #cfb469;
}

.medium:active {
	background-color: #b0881a;
}

.hard {
	background-color: #D05C38;
}

.hard:hover {
	background-color: #cc7960;
}

.hard:active {
	background-color: #b44220;
}
</style>