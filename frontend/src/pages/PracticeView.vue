<template>
	<SplitContentFocused>
		<template #left-menu>
			<div class="menu-item" 
				v-for="lesson in lessons" 
				:class="{'selected-item': lesson.id == selectedLessonId}"
				:key="lesson.id">
				<p :class="lesson.type" @click="selectSection(lesson.parentId, lesson.id)"> {{ lesson.name }} </p>
			</div>
			
		</template>
		<template #main-content>
			<div class="coding-content">
				<div class="language-selection">
					<div class="language" 
						v-for="language in languages" 
						:key="language" 
						@click="selectLanguage(language)">
						<p>
							{{ language }}
						</p>
					</div>
				</div>
				<div class="bottom-section">
					<ProgrammingInterface class="programming-interface" :codingChallenge="lessonContent"></ProgrammingInterface>

					<DifficultySelection></DifficultySelection>
				</div>
				
			</div>
		</template>
	</SplitContentFocused>
</template>

<script setup>
import { ref } from 'vue';
import SplitContentFocused from '@/layouts/SplitContentFocused.vue';
import ProgrammingInterface from '@/components/ProgrammingInterface.vue';
import DifficultySelection from '@/components/DifficultySelection.vue';
import { sections } from '@/data/lessonSections';

const lessonContent = ref(sections[0].lessons[0].python.content);

const languages = [
	'Java',
	'Python',
	'Javascript'
]

const lessons = [];
const selectedLanguage = ref('Python');
const selectedLesson = ref(sections[0].lessons[1])
const selectedLessonId = ref(selectedLesson.value.id)


// Set the sections based on the lesson sections
sections.forEach(section => {
	lessons.push({
		id: section.id,
		name: `${section.id}. ${section.title}`,
		type: 'section-header',
	})
	section.lessons.forEach(lesson => {
		lessons.push({
			parentId: section.id,
			id: lesson.id,
			name: `${lesson.id} ${lesson.title}`,
			type: 'lesson-item',
		})
	})
})

const sectionId = ref('0');
const lessonId = ref('0.0'); 

const selectSection = (sectionIdp, lessonIdp) => {
	sectionId.value = sectionIdp;
	lessonId.value = lessonIdp;
	selectedLessonId.value = lessonId;
	showSection();
}


const showSection = () => {
	if (sectionId.value && lessonId.value) {
		const sec = sections.find(section => {
			console.log(section.id == sectionId.value);
			return section.id == sectionId.value
		})

		const les = sec.lessons.find(lesson => {
			return lesson.id === lessonId.value
		})

		lessonContent.value = selectedLanguage.value == 'Python' ?
			les.python.content :
			selectedLanguage.value == 'Java' ? 
			les.java.content :
			selectedLanguage.value == 'Javascript' ?
			les.javascript.content : 'Select a language'

		selectedLessonId.value = lessonId.value;
	}
	selectedLessonId.value = lessonId.value;
}

const selectLanguage = (language) => {
	selectedLanguage.value = language;
	showSection();
}
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
	height: 4rem;
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

.selected-item {
	background-color: #C0C0C0;
	color: #181720;
	width: 19rem;
	height: 3rem;
	border-radius: 1rem;
	text-align: center;
	align-items: center;
	display: flex;
}
</style>