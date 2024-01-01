import {
  AnyKeys,
  Document,
  FilterQuery,
  InsertManyOptions,
  MergeType,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
  mongo,
} from 'mongoose';

export abstract class Repository<T> {
  abstract transaction(...args: any[]): Promise<void>;

  abstract exists(filters: FilterQuery<T>): Promise<boolean>;

  abstract findOne(dto: AnyKeys<T>, options?: SaveOptions): Promise<T>;

  abstract findMany(
    filters: FilterQuery<T>,
    projection?: ProjectionType<Document<T>>,
    options?: QueryOptions,
  ): Promise<T[]>;

  abstract insertOne(dto: AnyKeys<T>, options?: SaveOptions): Promise<T>;

  abstract insertMany(
    dto: AnyKeys<T>[],
    options?: InsertManyOptions,
  ): Promise<MergeType<Document, T>[]>;

  abstract updateOne(
    filters: FilterQuery<T>,
    dto: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateWriteOpResult>;

  abstract updateById(
    id: Types.ObjectId,
    dto: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T>;

  abstract updateMany(
    filters: FilterQuery<T>,
    dto: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateWriteOpResult>;

  abstract deleteOne(
    filters: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<mongo.DeleteResult>;

  abstract deleteById(
    id: Types.ObjectId,
    options?: QueryOptions<T>,
  ): Promise<T>;

  abstract deleteMany(
    filters: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<mongo.DeleteResult>;
}
