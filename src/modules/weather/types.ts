type WindInfo = {
  speed: number;
  directionDegrees: number;
  gust: number;
};

type WeatherInfoInput = {
  location: string;
  main: string;
  description: string;
  icon: string;
  temperature: number;
  feel: number;
  pressure: number;
  humidity: number;
  minTemperature: number;
  maxTemperature: number;
  visibilityMeters: number;
  wind: WindInfo;
};

interface IWeatherInfo {
  location: string;
  main: string;
  description: string;
  icon: string;
  temperature: number;
  feel: number;
  pressure: number;
  humidity: number;
  minTemperature: number;
  maxTemperature: number;
  visibilityMeters: number;
  wind: WindInfo;
}

export type WeatherApiData = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export class WeatherInfo implements IWeatherInfo {
  readonly location: string;
  readonly main: string;
  readonly description: string;
  readonly icon: string;
  readonly temperature: number;
  readonly feel: number;
  readonly pressure: number;
  readonly humidity: number;
  readonly minTemperature: number;
  readonly maxTemperature: number;
  readonly visibilityMeters: number;
  readonly wind: WindInfo;

  constructor(weatherInfoInput: WeatherInfoInput) {
    this.location = weatherInfoInput.location;
    this.main = weatherInfoInput.main;
    this.description = weatherInfoInput.description;
    this.icon = weatherInfoInput.icon;
    this.temperature = weatherInfoInput.temperature;
    this.feel = weatherInfoInput.feel;
    this.pressure = weatherInfoInput.pressure;
    this.humidity = weatherInfoInput.humidity;
    this.minTemperature = weatherInfoInput.minTemperature;
    this.maxTemperature = weatherInfoInput.maxTemperature;
    this.visibilityMeters = weatherInfoInput.visibilityMeters;
    this.wind = weatherInfoInput.wind;
  }

  static fromWeatherApi(weatherApi: WeatherApiData): WeatherInfo {
    const weatherInput: WeatherInfoInput = {
      location: `${weatherApi.name}, ${weatherApi.sys.country}`,
      main: weatherApi.weather[0]?.main,
      description: weatherApi.weather[0]?.description,
      icon: weatherApi.weather[0]?.icon,
      temperature: weatherApi.main.temp,
      feel: weatherApi.main.feels_like,
      pressure: weatherApi.main.pressure,
      humidity: weatherApi.main.humidity,
      minTemperature: weatherApi.main.temp_min,
      maxTemperature: weatherApi.main.temp_max,
      visibilityMeters: weatherApi.visibility,
      wind: {
        directionDegrees: weatherApi.wind.deg,
        gust: weatherApi.wind.gust,
        speed: weatherApi.wind.speed,
      },
    };
    return new this(weatherInput);
  }

  get IconUrl() {
    return `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
  }

  get CurrentTemperature() {
    return `${this.temperature}ºC`;
  }

  get Feel() {
    return `${this.feel}ºC`;
  }

  get MinTemperature() {
    return `${this.minTemperature}ºC`;
  }

  get MaxTemperature() {
    return `${this.maxTemperature}ºC`;
  }

  get WindSpeed() {
    return `${this.wind.speed} m/s`;
  }
}
