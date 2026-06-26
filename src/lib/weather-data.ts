export type WeatherCurrent = {
  temperatureC: number;
  humidityPct: number;
  windSpeedMph: number;
  windDirectionDeg: number;
  precipitationMm: number;
  rainMm: number;
  weatherCode: number;
};

export type WeatherDaily = {
  date: string;
  weatherCode: number;
  tempMaxC: number;
  tempMinC: number;
  precipitationMm: number;
  rainMm: number;
  windSpeedMaxMph: number;
  windDirectionDeg: number;
  humidityMeanPct: number;
};

export type LocationWeather = {
  latitude: number;
  longitude: number;
  label: string;
  timezone: string;
  current: WeatherCurrent;
  daily: WeatherDaily[];
};

type OpenMeteoResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    rain: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
    relative_humidity_2m_mean: number[];
  };
};

export function buildOpenMeteoUrl(latitude: number, longitude: number) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current:
      "temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,weather_code",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_mean",
    timezone: "auto",
    forecast_days: "7",
    wind_speed_unit: "mph",
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export function parseOpenMeteoResponse(data: OpenMeteoResponse): Omit<LocationWeather, "label"> {
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    current: {
      temperatureC: data.current.temperature_2m,
      humidityPct: data.current.relative_humidity_2m,
      windSpeedMph: data.current.wind_speed_10m,
      windDirectionDeg: data.current.wind_direction_10m,
      precipitationMm: data.current.precipitation,
      rainMm: data.current.rain,
      weatherCode: data.current.weather_code,
    },
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      tempMaxC: data.daily.temperature_2m_max[index],
      tempMinC: data.daily.temperature_2m_min[index],
      precipitationMm: data.daily.precipitation_sum[index],
      rainMm: data.daily.rain_sum[index],
      windSpeedMaxMph: data.daily.wind_speed_10m_max[index],
      windDirectionDeg: data.daily.wind_direction_10m_dominant[index],
      humidityMeanPct: data.daily.relative_humidity_2m_mean[index],
    })),
  };
}

export function formatWindDirection(degrees: number) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
}

export function weatherCodeLabel(code: number) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}

export function weatherCodeEmoji(code: number) {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

export function formatForecastDay(date: string, timezone: string) {
  const value = new Date(`${date}T12:00:00`);
  const today = new Date();
  const todayKey = today.toLocaleDateString("en-GB", { timeZone: timezone });
  const dayKey = value.toLocaleDateString("en-GB", { timeZone: timezone });

  if (todayKey === dayKey) return "Today";

  return value.toLocaleDateString("en-GB", {
    weekday: "short",
    timeZone: timezone,
  });
}
