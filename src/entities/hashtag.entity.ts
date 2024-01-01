import { Hashtag } from '@database';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HashtagEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  label: string;

  @Field(() => String)
  slug: string;

  @Field(() => Int)
  sequence: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(partial?: Partial<Hashtag>) {
    this.id = partial?._id;
    Object.assign(this, partial);
  }
}
