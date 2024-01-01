import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ActionBy } from '@common';

@Schema({ timestamps: true })
export class Engagement extends Document {
  @Prop({ type: SchemaTypes.String, enum: ActionBy })
  action: ActionBy;

  @Prop({ type: SchemaTypes.String })
  ip: string;

  @Prop({ type: SchemaTypes.ObjectId })
  refId: Types.ObjectId;
}

export const EngagementSchema = SchemaFactory.createForClass(Engagement);
