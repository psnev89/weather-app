import { defineStore } from "pinia";
import { TaskResult } from "../core/types";
import WeatherApi from "./api";

export const useWeatherStore = defineStore("weather", () => {
  async function getWeatherInfo(lat: number, lon: number): TaskResult<Object> {
    let error,
      data = null;
    try {
      data = (await WeatherApi.getWeatherInfo(lat, lon)).data as Object;
    } catch (err) {
      error = err;
    }
    return [error as Error, data];
  }

  return {
    getWeatherInfo,
  };
});
