import { httpClient } from "../core/http";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const units = "metric";

export default {
  getWeatherInfo(lat: number, lon: number, exclude: string = "") {
    return httpClient.get({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=${units}`,
      payload: null,
    });
  },
};
