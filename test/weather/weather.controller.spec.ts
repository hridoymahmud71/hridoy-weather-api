import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PaginationService } from '../../src/services/pagination.service';
import { Weather } from '../../src/weather/weather.model';
import { WeatherController } from '../../src/weather/weather.controller';
import { HttpStatus } from '@nestjs/common';

describe('Weather Pagination', () => {
  let weatherController: WeatherController;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        PaginationService,
        {
          provide: getModelToken(Weather.name),
          useValue: Weather,
        },
      ],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    paginationService = module.get<PaginationService>(PaginationService);
  });

  describe('Pagination Testing', () => {
    it('should paginate weather data', async () => {
      const pageNumber = '1';
      const limit = '10';

      jest.spyOn(paginationService, 'paginateResults').mockResolvedValueOnce([
        // Provide mocked data here
      ]);

      const result = await weatherController.getWeatherData(pageNumber, limit);

      if (Array.isArray(result) && result.length > 0) {
        // Example: Assert the presence of specific keys or properties in the data
        expect(result[0]).toHaveProperty('temperature');
        expect(result[0]).toHaveProperty('timestamp');

        // Add structure and integrity tests here
        it('should have the correct structure for weather data', () => {
          expect(result).toBeInstanceOf(Array);
          expect(result.length).toBeGreaterThan(0);

          const sampleData = result[0];
          expect(sampleData).toHaveProperty('_id');
          expect(sampleData).toHaveProperty('latitude', 23.75);
          expect(sampleData).toHaveProperty('longitude', 90.375);
          expect(sampleData).toHaveProperty('hourly');
          expect(sampleData.hourly).toHaveProperty('time');
          expect(sampleData.hourly).toHaveProperty('temperature_2m');
          expect(sampleData).toHaveProperty('createdAt');
        });

        it('should have valid hourly temperature data', () => {
          result.forEach((data) => {
            expect(data.hourly.temperature_2m).toBeInstanceOf(Array);
            expect(data.hourly.time).toBeInstanceOf(Array);
            expect(data.hourly.temperature_2m.length).toEqual(
              data.hourly.time.length,
            );

            data.hourly.temperature_2m.forEach((temp) => {
              expect(temp).toBeGreaterThanOrEqual(-50);
              expect(temp).toBeLessThanOrEqual(50);
            });
          });
        });
      } else {
        expect(result).toMatchObject({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No weather data found',
        });
      }
    });

    it('should return 404 if no weather data found', async () => {
      const pageNumber = '1';
      const limit = '10';

      jest
        .spyOn(paginationService, 'paginateResults')
        .mockResolvedValueOnce([]);

      const result = await weatherController.getWeatherData(pageNumber, limit);

      expect(result).toMatchObject({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No weather data found',
      });
    });

    // Add more test cases for edge cases, error handling, etc.
  });
});
