<template>
	<SplitContentRace>
		<template #main-content>
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
				<div class="bottom-section">

					<ProgrammingInterface ref='programmingInterfaceRef' codingChallenge='blah blah blah'></ProgrammingInterface>

					<DifficultySelection></DifficultySelection>
				</div>
			</div>
		</template>
		<template #racetrack>
			<div class="finish"></div>
			<div class="tracks">
				<div class="track"><img :style="{bottom: ducks.get(user1)}" src="../assets/duck1.png"></div>
				<div class="track"><img :style="{bottom: ducks.get(user2)}" src="../assets/duck1.png"></div>
				<div class="track"><img :style="{bottom: ducks.get(user3)}" src="../assets/duck2.png"></div>
				<div class="track"><img :style="{bottom: ducks.get(user4)}" src="../assets/duck1.png"></div>
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

const programmingInterfaceRef = ref(null);

const getPercentComplete = () => {
	if (programmingInterfaceRef.value) {
		return programmingInterfaceRef.value.calculateCompletionPercent();
	}
	
}

// const trackLength =

const cio = io('http://127.0.0.1:3000/');
let percent = 0; // percent of words completed
let scores = ref(new Map());

let ducks = ref(new Map())//new Map(); // user, duckdist

let d1dist = ref('0')
let d2dist = ref('0');
let d3dist = ref('0');
let d4dist = ref('0');

let user1 = ref('');
let user2 = ref('');
let user3 = ref('');
let user4 = ref('');

let duckdists = [d1dist, d2dist, d3dist, d4dist];

cio.on('connect', () => {
	console.log('connected!');
});


cio.on('disconnected', (user) => {
	let duck = ducks.value.get(user);
	duckdists.push(duck);
	ducks.value.delete(user);
})

cio.on('scores', (_scores) => {
	_scores.forEach(e => {
		user1.value = e[0];
		user2.value = e[1];
		user3.value = e[2];
		user4.value = e[3];
		let user = e[0];
		let progress = e[1];
		scores.value.set(user, progress);

		console.log('user: ' + e[0]);
		console.log('dist:' + ducks.value.get(user), user, 'scree')

		console.log(d1dist.value);
		console.log(ducks.value.get(user))

		ducks.value.set(user, progress + 'px');
		console.log(ducks.value.get(user))
		cio.emit('progress', getPercentComplete()*2);

	});
})

cio.on('start', (users) => {
	console.log('game start!')
	// console.log(users.length);
	users.forEach(e => {
		let duck = duckdists.pop();
		ducks.value.set(e, duck);
		console.log(ducks.value.get(e));
	})

})

cio.on('end', () => {
	console.log('game end!')
})

function sendCount() {
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
	position: relative;
	display: flex;
	justify-content: space-around;

	img {
		display: block;
		width: 70px;
		position: fixed;
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