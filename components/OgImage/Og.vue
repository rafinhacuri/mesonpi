<script setup lang="ts">

const { title, description } = defineProps({
	title: String,
	description: String,
})

const logoPath = '/logo.png'
</script>

<template>
	<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; background-image: url('/fundo.jpg'); background-size: 100% 100%; padding: 2rem; box-sizing: border-box;">
		<div style="background: linear-gradient(to bottom right, #134f9c, #0d77ce); color: #fff; border-radius: 20px; padding: 2rem; box-sizing: border-box;">
			<div style="display: flex; align-items: center; justify-content: space-between;">
				<h1 style="font-size: 60px; margin-bottom: 1rem; text-align: center;">
					{{ title }}
				</h1>
				<div style="display: flex; justify-content: center; align-items: center; height: 100px; width: 100px; padding: 2rem; box-sizing: border-box; margin-right: 10px;">
					<img :src="logoPath" alt="Logo" width="90px" height="90px">
				</div>
			</div>
			<p style="font-size: 22px; max-width: 800px; ">
				{{ description }}
			</p>
		</div>
	</div>
</template>
