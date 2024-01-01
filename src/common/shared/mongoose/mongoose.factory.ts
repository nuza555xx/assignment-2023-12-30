import { ConfigKey } from '@config';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongooseOptions = (config: ConfigService) =>
  config.get<MongooseModuleFactoryOptions>(ConfigKey.MONGOOSE);
