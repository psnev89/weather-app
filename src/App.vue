<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useNavigatorGeolocation } from "./modules/core/useNavigatorGeolocation";
import { useWeatherStore } from "./modules/weather/store";

const store = useWeatherStore();

const {
  geolocation,
  error,
  lastUpdate,
  get: getCoords,
} = useNavigatorGeolocation();

onMounted(async () => {
  await getCoords();

  store.getWeatherInfo(
    geolocation.value?.latitude as number,
    geolocation.value?.longitude as number
  );
});
</script>

<template>
  <div class="text-3xl text-center underline">Weather App</div>
  <div>{{ geolocation }}</div>
  <div>{{ error }}</div>
  <div>{{ lastUpdate }}</div>
  <button
    type="button"
    class="bg-slate-500 px-5 py-2 text-white rounded-full"
    @click="store.increment"
  >
    Increment Test
  </button>
</template>

<style scoped></style>
