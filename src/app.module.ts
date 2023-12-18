import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
//import { mongooseConfig } from './config/mongoose';
import { WeatherSchedulerService } from './scheduler/weather-scheduler.service';
import { WeatherController } from './weather/weather.controller';
import { Weather, WeatherSchema } from './weather/weather.model';
import { mongooseConfig } from './config/mongoose'; // Import the mongooseConfig
import { PaginationService } from './services/pagination.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    mongooseConfig, // Use mongooseConfig here
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherSchedulerService, PaginationService],
})
export class AppModule {}
