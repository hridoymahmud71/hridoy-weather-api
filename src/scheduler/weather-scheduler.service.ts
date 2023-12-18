// scheduler/weather-scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from '../weather/weather.model';

import * as dotenv from 'dotenv';
dotenv.config(); //

@Injectable()
export class WeatherSchedulerService {
  constructor(
    @InjectModel(Weather.name) private readonly weatherModel: Model<Weather>,
  ) {}

  @Cron(process.env.WEATHER_FETCH_INTERVAL) // Use the WEATHER_FETCH_INTERVAL from .env or a default value
  async fetchWeatherDataAndSave() {
    try {
      const lat = process.env.LAT;
      const long = process.env.LONG;

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`,
      );
      const { latitude, longitude, hourly } = response.data;

      const weather = new this.weatherModel({ latitude, longitude, hourly });
      await weather.save();
      console.log('Weather data saved:', weather);
    } catch (error) {
      console.error('Error fetching or saving weather data:', error.message);
    }
  }
}
