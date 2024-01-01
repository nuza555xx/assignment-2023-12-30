import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Base } from './base.schema';

@Schema({ timestamps: true })
export class Category extends Base {
  @Prop({ type: SchemaTypes.String })
  label: string;

  @Prop({ type: SchemaTypes.String, index: 'text', unique: true })
  slug: string;

  @Prop({ type: SchemaTypes.Number })
  sequence: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
