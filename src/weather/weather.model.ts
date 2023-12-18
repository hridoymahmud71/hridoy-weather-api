// weather/weather.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface HourlyData {
  time: string[];
  temperature_2m: number[];
}

@Schema()
export class Weather extends Document {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ type: Object }) // Specify the type as Object or use a specific type
  hourly: HourlyData; // Define a TypeScript interface for hourly data

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
