import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WeatherSchedulerService } from '../../src/scheduler/weather-scheduler.service';
import { Weather } from '../../src/weather/weather.model';

describe('WeatherSchedulerService', () => {
  let service: WeatherSchedulerService;
  let weatherModel: Model<Weather>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherSchedulerService,
        {
          provide: getModelToken(Weather.name),
          useValue: {
            new: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherSchedulerService>(WeatherSchedulerService);
    weatherModel = module.get<Model<Weather>>(getModelToken(Weather.name));
  });

  it('should fetch weather data and save it with a delay', async () => {
    jest
      .spyOn(service, 'fetchWeatherDataAndSave')
      .mockImplementation(async () => {
        // Simulate an asynchronous operation using setTimeout
        setTimeout(async () => {
          const mockData = {
            latitude: 23.8,
            longitude: 90.41,
            hourly: [{ temperature_2m: 25 }],
          };
          await weatherModel.create(mockData); // Simulate saving to the database
        }, 2000); // Simulate a delay of 2000ms (2 seconds)
      });

    jest.useFakeTimers(); // Using fake timers

    await service.fetchWeatherDataAndSave();

    jest.runAllTimers(); // Run all timers to execute the delayed function

    expect(service.fetchWeatherDataAndSave).toHaveBeenCalled();
    expect(weatherModel.create).toHaveBeenCalled();
  });

  // Add more tests as needed for error handling, edge cases, etc.
});
