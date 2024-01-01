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
import { Category } from '../schemas';
import { Repository } from '../database.abstract';

export class CategoryImpl implements Repository<Category> {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<Category>,
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

  async exists(filters: FilterQuery<Category>): Promise<boolean> {
    const exists = await this.model.exists(filters).exec();
    return isObject(exists);
  }

  findOne(
    filters: FilterQuery<Category>,
    projection?: ProjectionType<Document<Category>>,
    options?: QueryOptions,
  ): Promise<Category> {
    return this.model.findOne(filters, projection, options).exec();
  }

  findMany(
    filters: FilterQuery<Category>,
    projection?: ProjectionType<Document<Category>>,
    options?: QueryOptions,
  ): Promise<Category[]> {
    return this.model.find(filters, projection, options).exec();
  }

  insertOne(dto: AnyKeys<Category>, options?: SaveOptions): Promise<Category> {
    const created = new this.model(dto);
    return created.save(options);
  }

  insertMany(
    dto: AnyKeys<Category>[],
    options?: InsertManyOptions,
  ): Promise<MergeType<Document<Category>, Category>[]> {
    return this.model.insertMany(dto, options);
  }

  updateOne(
    filters: FilterQuery<Category>,
    dto: UpdateQuery<Category>,
    options?: QueryOptions<Category>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filters, dto, options).exec();
  }

  updateById(
    id: Types.ObjectId,
    dto: UpdateQuery<Category>,
    options?: QueryOptions<Category>,
  ): Promise<Category> {
    return this.model.findByIdAndUpdate(id, dto, options).exec();
  }

  updateMany(
    filters: FilterQuery<Category>,
    dto: UpdateQuery<Category>,
    options?: QueryOptions<Category>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filters, dto, options).exec();
  }

  deleteOne(
    filters: FilterQuery<Category>,
    options?: QueryOptions<Category>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteOne(filters, options).exec();
  }

  deleteById(
    id: Types.ObjectId,
    options?: QueryOptions<Category>,
  ): Promise<Category> {
    return this.model.findByIdAndDelete(id, options).exec();
  }

  deleteMany(
    filters: FilterQuery<Category>,
    options?: QueryOptions<Category>,
  ): Promise<mongo.DeleteResult> {
    return this.model.deleteMany(filters, options).exec();
  }
}
