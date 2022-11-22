import { processExpression } from "@vue/compiler-core";
import { TaskResult } from "../core/types";
import * as dotenv from "dotenv";
import { httpClient } from "../core/http";
dotenv.config();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

export default {
  getWeatherInfo(lat: number, lon: number, exclude: string = "") {
    return httpClient.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`
    );
  },
};
