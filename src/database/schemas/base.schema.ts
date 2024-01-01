import { EntityVisibility } from '@common';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ _id: false, versionKey: false, timestamps: true })
export class Base extends Document {
  @Prop({ type: SchemaTypes.String, default: EntityVisibility.PUBLISH })
  visibility: EntityVisibility;
}
