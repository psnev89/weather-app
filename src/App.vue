<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useNavigatorGeolocation } from "./modules/core/useNavigatorGeolocation";
import { useWeatherService } from "./modules/weather/service";
import { WeatherInfo } from "./modules/weather/types";
import AppCard from "./ui/AppCard.vue";
import AppInfoDisplay from "./ui/AppInfoDisplay.vue";

const { getWeatherInfo } = useWeatherService();

const { geolocation, get: getCoords } = useNavigatorGeolocation();

const loadingWeatherData: Ref<boolean> = ref(false);
const weather: Ref<WeatherInfo | null> = ref(null);
const error: Ref<string | Error | null> = ref(null);

onMounted(async () => {
  loadingWeatherData.value = true;
  await getCoords();

  const [weatherError = null, weatherData = null] = await getWeatherInfo(
    geolocation.value?.latitude as number,
    geolocation.value?.longitude as number
  );

  if (weatherError) {
    error.value = weatherError;
  }
  weather.value = weatherData;
  loadingWeatherData.value = false;
});
</script>

<template>
  <section class="max-w-3xl mx-auto p-7">
    <AppCard>
      <template #header>
        <div class="text-center p-5">
          <div class="text-4xl text-gray-900">How's the weather like? &#129300;</div>
        </div>
      </template>
      <template #default>
        <div class="p-5">
          <div class="text-center" v-if="loadingWeatherData">Loading...</div>
          <div v-else-if="error" class="text-center text-red-700 font-bold">
            {{ error }}
          </div>
          <div v-else>
            <h6 class="text-xl font-bold mb-5">
              {{ weather?.location ?? "Unknown :(" }}
            </h6>
            <div class="flex flex-wrap content-center gap-2">
              <div class="sm:w-1/4 w-full border p-2 rounded-md">
                <img
                  class="w-full aspect-square object-contain"
                  :src="weather?.IconUrl"
                  :alt="weather?.description"
                />
                <div class="text-center capitalize">
                  {{ weather?.description }}
                </div>
              </div>
              <div class="sm:w-1/2 w-full">
                <div class="flex w-full flex-col">
                  <AppInfoDisplay
                    label="Temperature:"
                    :value="weather?.CurrentTemperature"
                  ></AppInfoDisplay>
                  <AppInfoDisplay
                    label="Feels Like"
                    :value="weather?.Feel"
                  ></AppInfoDisplay>
                  <AppInfoDisplay
                    label="Minimum Temperature:"
                    :value="weather?.MinTemperature"
                  ></AppInfoDisplay>
                  <AppInfoDisplay
                    label="Maximum Temperature:"
                    :value="weather?.MaxTemperature"
                  ></AppInfoDisplay>
                  <AppInfoDisplay
                    label="Wind Speed"
                    :value="weather?.WindSpeed"
                  ></AppInfoDisplay>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-5 text-end">
          <small class="text-xs text-gray-500">by P S N, 2022</small>
        </div>
      </template>
    </AppCard>
  </section>
</template>
