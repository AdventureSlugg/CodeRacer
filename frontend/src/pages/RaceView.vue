<template>
	<SplitContentRace>
		<template #main-content>
			hello
			<button @click="sendCount">increaes word count</button>
			<button @click="sendStartGame">Start Game</button>
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
				<div class="bottom-section">
					<div class="programming-interface">

					</div>
					<div class="difficulty-selection">

					</div>
				</div>
			</div>
		</template>
		<template #racetrack>
			<div class="finish"></div>
			<div class="tracks">
				<div class="track"><img src="../assets/duck1.png"></div>
				<div class="track"><img src="../assets/duck1.png"></div>
				<div class="track"><img src="../assets/duck1.png"></div>
				<div class="track"><img src="../assets/duck1.png"></div>
			</div>
		</template>
	</SplitContentRace>
</template>

<script setup>
import SplitContentRace from '@/layouts/SplitContentRace.vue';
import { useTemplateRef } from 'vue'
const { io } = require("socket.io-client");

const cio = io('http://127.0.0.1:3000/');
let count = 0; // number of words completed
let totalWords = 100; // hard coded, oop
let scores = new Map();

let track = useTemplateRef('racetrack');
console.log(totalWords, track.clientHeight)

// client-side
cio.on('connect', () => {
	console.log('connected!');
});

cio.on('scores', (_scores) => {
	scores = _scores;
	console.log(scores)
})

function sendCount() {
	count++;
	cio.emit('wordcount', count);
	console.log('ahhhhhhhh');
}

function sendStartGame() {
	count++;
	cio.emit('start');
	console.log('start!!!');
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
	height: 10rem;
	width: 95%;
	margin: 0rem 2rem
}

.programming-interface {

}

.difficulty-selection {

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