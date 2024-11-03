<template>
	<div class="main-content">
		<slot name="main-content"></slot>
	</div>
	<div class="racetrack">
		<slot name="racetrack"></slot>
	</div>
</template>

<script setup>

</script>

<style scoped>
.racetrack {
	width: 30rem;
	height: 90%;
	background-color: #00A2BE;
	border: 4px dashed white;
}

.main-content {
	height: 100%;
	width: 100%;
}
</style>