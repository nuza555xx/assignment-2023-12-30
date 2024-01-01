import { ConfigKey } from '../config.enum';
import { registerAs } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const mongooseConfig = registerAs(
  ConfigKey.MONGOOSE,
  (): MongooseModuleFactoryOptions => {
    return {
      dbName: process.env.DB_DATABASE_NAME,
      uri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
    };
  },
);
