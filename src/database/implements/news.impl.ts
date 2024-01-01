import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  AggregateOptions,
  AnyKeys,
  Connection,
  Document,
  FilterQuery,
  InsertManyOptions,
  MergeType,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
  mongo,
} from 'mongoose';
import { isObject } from 'class-validator';
import { News } from '../schemas';
import { Repository } from '../database.abstract';

export class NewsImpl implements Repository<News> {
  constructor(
    @InjectModel(News.name) private readonly model: Model<News>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async transaction(...args: any[]): Promise<void> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await session.commitTransaction();
      args;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async exists(filters: FilterQuery<News>): Promise<boolean> {
    const exists = await this.model.exists(filters).exec();
    return isObject(exists);
  }

  aggregate<T>(
    pipelines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<T[]> {
    return this.model.aggregate(pipelines, options).exec();
  }

  findOne(
    filters: FilterQuery<News>,
    projection?: ProjectionType<Document<News>>,
    options?: QueryOptions,
  ): Promise<News> {
    return this.model.findOne(filters, projection, options).exec();
  }

  findMany(
    filters: FilterQuery<News>,
    projection?: ProjectionType<Document<News>>,
    options?: QueryOptions,
  ): Promise<News[]> {
    return this.model.find(filters, projection, options).exec();
  }

  insertOne(dto: AnyKeys<News>, options?: SaveOptions): Promise<News> {
    const created = new this.model(dto);
    return created.save(options);
  }

  insertMany(
    dto: AnyKeys<News>[],
    options?: InsertManyOptions,
  ): Promise<MergeType<Document<News>, News>[]> {
    return this.model.insertMany(dto, options);
  }

  updateOne(
    filters: FilterQuery<News>,
    dto: UpdateQuery<News>,
    options?: QueryOptions<News>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filters, dto, options).exec();
  }

  updateById(
    id: Types.ObjectId,
    dto: UpdateQuery<News>,
    options?: QueryOptions<News>,
  ): Promise<News> {
    return this.model.findByIdAndUpdate(id, dto, options).exec();
  }

  updateMany(
    filters: FilterQuery<News>,
    dto: UpdateQuery<News>,
    options?: QueryOptions<News>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filters, dto, options).exec();
  }

  deleteOne(
    filters: FilterQuery<News>,
    options?: QueryOptions<News>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteOne(filters, options).exec();
  }

  deleteById(id: Types.ObjectId, options?: QueryOptions<News>): Promise<News> {
    return this.model.findByIdAndDelete(id, options).exec();
  }

  deleteMany(
    filters: FilterQuery<News>,
    options?: QueryOptions<News>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteMany(filters, options).exec();
  }
}
