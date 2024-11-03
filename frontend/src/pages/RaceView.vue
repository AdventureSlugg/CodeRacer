<template>
	<SplitContentFocused>
		<template #left-menu>
			Hello
		</template>
		<template #main-content>
			hello
			<button @click="sendCount">yolosdflkdsjf</button>
			<button @click="sendStartGame">Start Game</button>
		</template>
	</SplitContentFocused>
</template>

<script setup>
import SplitContentFocused from '@/layouts/SplitContentFocused.vue';
const { io } = require("socket.io-client");

const cio = io('http://127.0.0.1:3000/');
let count = 0;
let scores = new Map();

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




</script>