<script setup lang="ts">
import { useWeatherStore } from "./modules/weather/store";

const store = useWeatherStore();
</script>

<template>
  <div class="text-3xl text-center underline">Weather App</div>
  <pre>
    {{ store }}
  </pre>
  <button type="button" class="bg-slate-500 px-5 py-2 text-white rounded-full" @click="store.increment"> Increment Test </button>
</template>

<style scoped></style>
