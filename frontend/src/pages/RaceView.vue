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
let uid = 0; // this needs to be set sometime
// client-side
cio.on('connect', () => {
	cio.on('assignUid', (who) => {
		uid = who;
		console.log('connected! you are ' + uid)
	})
});

function sendCount() {
	count++;
	cio.emit('wordcount', uid, count);
	console.log('ahhhhhhhh');
}

function sendStartGame() {
	count++;
	cio.emit('start');
	console.log('start!!!');
}




</script>