<template>
	<div class="left-menu">
		<slot name="left-menu"></slot>
	</div>

	<div class="main-content">
		<slot name="main-content"></slot>
	</div>
</template>

<script setup>

</script>

<style scoped>
.left-menu {
	width: 40rem;
	height: 100%;
}

.main-content {
	height: 100%;
	width: 100%;
}
</style>