import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateHashtag {
  @Field(() => String)
  label: string;
  @Field(() => String)
  slug: string;
  @Field(() => Int)
  sequence: number;
}

@InputType()
export class UpdateHashtag extends PartialType(CreateHashtag) {
  @Field(() => String)
  id: string;
}
