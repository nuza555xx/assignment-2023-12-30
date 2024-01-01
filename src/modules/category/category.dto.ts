import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCategory {
  @Field(() => String)
  label: string;
  @Field(() => String)
  slug: string;
  @Field(() => Int)
  sequence: number;
}

@InputType()
export class UpdateCategory extends PartialType(CreateCategory) {
  @Field(() => String)
  id: string;
}
