import { TaskResult } from "../core/types";
import WeatherApi from "./api";
import { WeatherApiData, WeatherInfo } from "./types";

export const useWeatherService = function () {
  async function getWeatherInfo(
    lat: number,
    lon: number
  ): Promise<TaskResult<WeatherInfo | null>> {
    let error,
      weatherInfo = null;
    try {
      const data = (await WeatherApi.getWeatherInfo(
        lat,
        lon
      )) as WeatherApiData;

      weatherInfo = WeatherInfo.fromWeatherApi(data);
    } catch (err) {
      error = err;
    }
    return [error as Error, weatherInfo];
  }

  return {
    getWeatherInfo,
  };
};
