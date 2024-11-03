<template>
	<SplitContentFocused>
		<template #left-menu>
			<div class="menu-item" 
				v-for="lesson in lessons" 
				:class="{'selected-item': lesson.id == selectedLesson}"
				:key="lesson.id">
				<p :class="lesson.type"> {{ lesson.name }} </p>
			</div>
			
		</template>
		<template #main-content>
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
	</SplitContentFocused>
</template>

<script setup>
import { ref } from 'vue';
import SplitContentFocused from '@/layouts/SplitContentFocused.vue';

const selectedLesson = ref('0')
const lessons = [
	{
		id: '0',
		name: '0. Overview',
		type: 'section-header',
	},
	{
		id: '0.0',
		name: '0.0 Introduction',
		type: 'lesson-item',
	},
	{
		id: '0.1',
		name: '0.1 Format',
		type: 'lesson-item',
	},
	{
		id: '0.2',
		name: '0.2 About',
		type: 'lesson-item',
	},
	{
		id: '1',
		name: '1. Basics',
		type: 'section-header',
	},
	{
		id: '1.0',
		name: '0.0 Syntax of the Language',
		type: 'lesson-item',
	},
	{
		id: '1.1',
		name: '1.1 Math Operations',
		type: 'lesson-item',
	},
	{
		id: '1.2',
		name: '1.2 Functions',
		type: 'lesson-item',
	},
]

const languages = [
	'Java',
	'Python',
	'Javascript'
]
</script>

<style scoped>
.menu-item {
	color:aliceblue;
	margin-left: 6rem;
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