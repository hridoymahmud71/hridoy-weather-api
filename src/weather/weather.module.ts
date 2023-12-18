// weather/weather.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherController } from './weather.controller';
import { Weather, WeatherSchema } from './weather.model';
import { PaginationService } from '../services/pagination.service'; // Import PaginationService

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [PaginationService], // Ensure PaginationService is added to providers here if needed
})
export class WeatherModule {}
