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
						:class="{'selected-language': language === selectedLanguage}"
						:key="language" 
						@click="selectLanguage(language)">
						<p>
							{{ language }}
						</p>
					</div>
				</div>
				<div class="bottom-section">
					<ProgrammingInterface ref="programmingInterfaceRef" class="programming-interface" :codingChallenge="lessonContent"></ProgrammingInterface>

					<div style="display: flex;">
						<DifficultySelection></DifficultySelection>
						<span style="display:flex; flex-grow: 1; flex-direction: row-reverse;">
							<button class="reset" @click="resetProgrammingInterface()"> <img src="../assets/Restart.png" alt="Reset" width="40px"> </button>
						</span>
					</div>
					
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

const programmingInterfaceRef = ref(null);
const resetProgrammingInterface = () => {
	if(programmingInterfaceRef.value) {
		programmingInterfaceRef.value.resetGame();
	}
}

const lessonContent = ref(sections[0].lessons[0].java.content);

const languages = [
	'Java',
	'Python',
	'Javascript'
]

const lessons = [];
const selectedLanguage = ref('Java');
const selectedLesson = ref(sections[0].lessons[0])
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
	if(sectionIdp && lessonIdp) {
		sectionId.value = sectionIdp;
		lessonId.value = lessonIdp;
		selectedLessonId.value = lessonId;
		showSection();
	}
}


const showSection = () => {
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
	resetProgrammingInterface();
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
	margin-right: 1rem;
	margin-top: 1rem;
	font-size: 20px;
	height: 3rem;
	border-radius: 1rem 1rem 0rem 0rem;
}

.selected-language {
	background-color: #132629;
	border: solid 2px #00A2BE;
	border-bottom: 0px;
}

.selected-item {
	background-color: #ffffff;
	color: #181720;
	width: 19rem;
	height: 3rem;
	border-radius: 1rem;
	text-align: center;
	align-items: center;
	display: flex;
}

.reset {
	width: 4rem;
	height: 3.5rem;
	border: none;
	margin-right: 2rem;
	font-size: 28px;
	color: white;
	background-color: purple;
	font-weight: bold;
	border-radius: 1rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.reset:hover {
	background-color: rgb(131, 64, 131);
}

.reset:active {
	background-color: rgb(96, 0, 96);
}
</style>