<template>
	<SplitContentRace>
		<template #main-content>
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
				<div class="track"><img :style="{bottom: duck1}" src="../assets/duck1.png"></div>
				<div class="track"><img :style="{bottom: duck2}" src="../assets/duck1.png"></div>
				<div class="track"><img :style="{bottom: duck3}" src="../assets/duck2.png"></div>
				<div class="track"><img :style="{bottom: duck4}" src="../assets/duck1.png"></div>
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

// const getPercentComplete = () => {
// 	if (programmingInterfaceRef.value) {
// 		return programmingInterfaceRef.value.calculateCompletionPercent();
// 	}
	
// }

// const trackLength =

const socket = io('http://127.0.0.1:3000/');
// const sessionID = localStorage.getItem("sessionID");

// if (sessionID) {
//   socket.auth = { sessionID };
//   socket.connect();
// }

// let percent = 0; // percent of words completed
// let scores = ref(new Map());

let ducks = new Map()//new Map(); // user, duckdist

let ddist1 = ref('0')
let ddist2 = ref('0');
let ddist3 = ref('0');
let ddist4 = ref('0');

let duckdists = [ddist1, ddist2, ddist3, ddist4];

let uid = -1;

socket.on('connect', () => {
	console.log('hi');
});

socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
//   // store it in the localstorage (sessionStorage for dev)
//   sessionStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
  uid = userID;
});



socket.on('assignId', (id) => {
	uid = id;
	console.log('I am id:', uid);
})


socket.on('disconnected', (user) => {
	let duck = ducks.get(user);
	duckdists.push(duck);
	ducks.delete(user);
})

// socket.on('scores', (_scores) => {
// 	console.log(ducks)
// 	_scores.forEach(e => {
// 		let user = e[0];
// 		let progress = e[1];
// 		console.log(user, ducks.get(user)[0].value)
// 		let ddist = ducks.get(user);
// 		ddist[0].value = progress + 'px';
// 		// ddist.value = progress + 'px';
// 		// scores.value.set(user, progress);

// 		// ducks.set(user, progress + 'px');
// 		socket.emit('progress', getPercentComplete()*5);

// 	});
// })

// socket.on('start', (users) => {
// 	console.log('game start!')
// 	users.forEach(e => {
// 		ducks.set(e, [duckdists.pop()]);
// 		// let duck = duckdists.pop();
// 		// ducks.value.set(e, duck);
// 		// console.log(ducks.value.get(e));
// 	})

// })

// socket.on('end', () => {
// 	console.log('game end!')
// })

// function sendCount() {
// 	socket.emit('progress', percent);
// }

function sendStartGame() {
	socket.emit('start');
}

function sendEndGame() {
	socket.emit('end');
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