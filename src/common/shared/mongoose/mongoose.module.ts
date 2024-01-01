import { Global, Module } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule as MongooseCoreModule,
} from '@nestjs/mongoose';
import { getMongooseOptions } from './mongoose.factory';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class MongooseModule {
  static forFeature(models: ModelDefinition[]) {
    return {
      module: MongooseModule,
      imports: [
        MongooseCoreModule.forRootAsync({
          useFactory: getMongooseOptions,
          inject: [ConfigService],
        }),
        MongooseCoreModule.forFeature(models),
      ],
      exports: [MongooseCoreModule],
    };
  }
}
