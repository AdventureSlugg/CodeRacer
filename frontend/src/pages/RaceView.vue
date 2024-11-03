<template>
	<SplitContentRace>
		<template #main-content>
			hello
			<button @click="sendCount">increaes word count</button>
			<button @click="sendStartGame">Start Game</button>
			<button @click="sendEndGame">End Game</button>
			<div class="coding-content">
				<div class="language-selection">
					<div class="language" 
						v-for="language in languages" 
						:key="language">
						<p>
							{{ language }}
						</p>
					</div>
				</div>
				{{ scores }}
				{{ messages }}
				<div class="bottom-section">
					<ProgrammingInterface></ProgrammingInterface>

					<DifficultySelection></DifficultySelection>
				</div>
			</div>
		</template>
		<template #racetrack>
			<div class="finish"></div>
			<div class="tracks">
				<div class="track"><img src="../assets/duck1.png"></div>
				<div class="track"><img src="../assets/duck1.png"></div>
				<div class="track"><img src="../assets/duck2.png"></div>
				<div class="track"><img src="../assets/duck1.png"></div>
			</div>
		</template>
	</SplitContentRace>
</template>

<script setup>
import DifficultySelection from '@/components/DifficultySelection.vue';
import ProgrammingInterface from '@/components/ProgrammingInterface.vue';
import SplitContentRace from '@/layouts/SplitContentRace.vue';
const { io } = require("socket.io-client");
import { ref } from 'vue';

const cio = io('http://127.0.0.1:3000/');
let percent = 0; // percent of words completed
let scores = ref(new Map());
let messages = ref('');

cio.on('connect', () => {
	console.log('connected!');
});

cio.on('scores', (_scores) => {
	_scores.forEach(e => {
		scores.value.set(e[0], e[1]);
	});
})

cio.on('start', () => {
	console.log('game start!')
})

cio.on('end', () => {
	console.log('game end!')
})

function sendCount() {
	percent++; //this line is temp
	cio.emit('progress', percent);
}

function sendStartGame() {
	cio.emit('start');
}

function sendEndGame() {
	cio.emit('end');
}

const languages = [
	'Java',
	'Python',
	'Javascript'
]

</script>

<style scoped>
.tracks {
	display: flex;
	flex-direction: row;
	height: 100%;
	justify-content: space-around;
}

.track {
	/* height: 100%; */
	width: 100%;
	border: #132629 dashed 2px;

	img {
		width: 100%;
		bottom: 0;
	}
}

.section-header {
	font-weight: bold;
	font-size: 24px;
}
.lesson-item {
	font-weight: normal;
	font-size: 20px;
	color: #C0C0C0;
	margin-left: 2rem;
}
.coding-content {
	margin-left: 2rem;
	background-color: #132629;
	width: 98%;
	height: 90%;
	border-radius: 17px;
}

.language-selection {
	margin-left: 2rem;
	display: flex;
}

.bottom-section {
	border: solid 2px #00A2BE;
	height: calc(100% - 6rem);
	width: calc(100% - 4rem);
	margin: 0rem 2rem;
}

.programming-interface {
	height: 85%; 
}

.language {
	background-color: #181720;
	color: #00A2BE;
	width: 10rem;
	text-align: center;
	align-items: center;
	margin-right: 1rem;
	margin-top: 1rem;
	font-size: 20px;
	height: 3rem;
	display: flex;
}

</style>