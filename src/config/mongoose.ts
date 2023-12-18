import { MongooseModule } from '@nestjs/mongoose';
import { ConnectOptions } from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config(); // 

export const mongooseConfig = MongooseModule.forRoot(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

