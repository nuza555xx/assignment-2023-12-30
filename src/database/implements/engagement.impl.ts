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
import { Engagement } from '../schemas';
import { Repository } from '../database.abstract';

export class EngagementImpl implements Repository<Engagement> {
  constructor(
    @InjectModel(Engagement.name) private readonly model: Model<Engagement>,
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

  async exists(filters: FilterQuery<Engagement>): Promise<boolean> {
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
    filters: FilterQuery<Engagement>,
    projection?: ProjectionType<Document<Engagement>>,
    options?: QueryOptions,
  ): Promise<Engagement> {
    return this.model.findOne(filters, projection, options).exec();
  }

  findMany(
    filters: FilterQuery<Engagement>,
    projection?: ProjectionType<Document<Engagement>>,
    options?: QueryOptions,
  ): Promise<Engagement[]> {
    return this.model.find(filters, projection, options).exec();
  }

  insertOne(
    dto: AnyKeys<Engagement>,
    options?: SaveOptions,
  ): Promise<Engagement> {
    const created = new this.model(dto);
    return created.save(options);
  }

  insertMany(
    dto: AnyKeys<Engagement>[],
    options?: InsertManyOptions,
  ): Promise<MergeType<Document<Engagement>, Engagement>[]> {
    return this.model.insertMany(dto, options);
  }

  updateOne(
    filters: FilterQuery<Engagement>,
    dto: UpdateQuery<Engagement>,
    options?: QueryOptions<Engagement>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filters, dto, options).exec();
  }

  updateById(
    id: Types.ObjectId,
    dto: UpdateQuery<Engagement>,
    options?: QueryOptions<Engagement>,
  ): Promise<Engagement> {
    return this.model.findByIdAndUpdate(id, dto, options).exec();
  }

  updateMany(
    filters: FilterQuery<Engagement>,
    dto: UpdateQuery<Engagement>,
    options?: QueryOptions<Engagement>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filters, dto, options).exec();
  }

  deleteOne(
    filters: FilterQuery<Engagement>,
    options?: QueryOptions<Engagement>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteOne(filters, options).exec();
  }

  deleteById(
    id: Types.ObjectId,
    options?: QueryOptions<Engagement>,
  ): Promise<Engagement> {
    return this.model.findByIdAndDelete(id, options).exec();
  }

  deleteMany(
    filters: FilterQuery<Engagement>,
    options?: QueryOptions<Engagement>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteMany(filters, options).exec();
  }
}
