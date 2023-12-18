// src/weather/weather.controller.ts
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.model';
import { PaginationService } from '../services/pagination.service';

@Controller('weather')
export class WeatherController {
  constructor(
    @InjectModel(Weather.name) private readonly weatherModel: Model<Weather>,
    private readonly paginationService: PaginationService,
  ) {}

  @Get()
  async getWeatherData(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    try {
      const pageNumber: number = parseInt(page, 10);
      const limitNumber: number = parseInt(limit, 10);

      const paginatedResult = await this.paginationService.paginateResults(
        this.weatherModel,
        pageNumber,
        limitNumber,
        {}, // Add filters here if needed
        { sort: { createdAt: -1 } } // Add options for sorting
      );

      if (paginatedResult.length === 0) {
        throw new HttpException('No weather data found', HttpStatus.NOT_FOUND);
      }

      return paginatedResult;
    } catch (error) {
      // console.error('Error fetching weather data:', error.message);
      // if (error.status === HttpStatus.NOT_FOUND) {
      //   throw error;
      // }
      // return { error: 'Failed to retrieve weather data' };

      throw new HttpException('No weather data found', HttpStatus.NOT_FOUND);
    }
  }
}
