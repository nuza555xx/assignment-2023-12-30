import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  AnyKeys,
  Connection,
  Document,
  FilterQuery,
  InsertManyOptions,
  MergeType,
  Model,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
  mongo,
} from 'mongoose';
import { isObject } from 'class-validator';
import { Hashtag } from '../schemas';
import { Repository } from '../database.abstract';

export class HashtagImpl implements Repository<Hashtag> {
  constructor(
    @InjectModel(Hashtag.name) private readonly model: Model<Hashtag>,
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

  async exists(filters: FilterQuery<Hashtag>): Promise<boolean> {
    const exists = await this.model.exists(filters).exec();
    return isObject(exists);
  }

  findOne(
    filters: FilterQuery<Hashtag>,
    projection?: ProjectionType<Document<Hashtag>>,
    options?: QueryOptions,
  ): Promise<Hashtag> {
    return this.model.findOne(filters, projection, options).exec();
  }

  findMany(
    filters: FilterQuery<Hashtag>,
    projection?: ProjectionType<Document<Hashtag>>,
    options?: QueryOptions,
  ): Promise<Hashtag[]> {
    return this.model.find(filters, projection, options).exec();
  }

  insertOne(dto: AnyKeys<Hashtag>, options?: SaveOptions): Promise<Hashtag> {
    const created = new this.model(dto);
    return created.save(options);
  }

  insertMany(
    dto: AnyKeys<Hashtag>[],
    options?: InsertManyOptions,
  ): Promise<MergeType<Document<Hashtag>, Hashtag>[]> {
    return this.model.insertMany(dto, options);
  }

  updateOne(
    filters: FilterQuery<Hashtag>,
    dto: UpdateQuery<Hashtag>,
    options?: QueryOptions<Hashtag>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filters, dto, options).exec();
  }

  updateById(
    id: Types.ObjectId,
    dto: UpdateQuery<Hashtag>,
    options?: QueryOptions<Hashtag>,
  ): Promise<Hashtag> {
    return this.model.findByIdAndUpdate(id, dto, options).exec();
  }

  updateMany(
    filters: FilterQuery<Hashtag>,
    dto: UpdateQuery<Hashtag>,
    options?: QueryOptions<Hashtag>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filters, dto, options).exec();
  }

  deleteOne(
    filters: FilterQuery<Hashtag>,
    options?: QueryOptions<Hashtag>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteOne(filters, options).exec();
  }

  deleteById(
    id: Types.ObjectId,
    options?: QueryOptions<Hashtag>,
  ): Promise<Hashtag> {
    return this.model.findByIdAndDelete(id, options).exec();
  }

  deleteMany(
    filters: FilterQuery<Hashtag>,
    options?: QueryOptions<Hashtag>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteMany(filters, options).exec();
  }
}
