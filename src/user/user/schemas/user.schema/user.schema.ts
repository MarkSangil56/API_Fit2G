import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone_no: string;

  @Prop()
  display_name: string;

  @Prop()
  photo_url: string;

  @Prop()
  shortDescription: string;

  @Prop()
  deviceToken: string;

  @Prop({ type: Object })
  created_time: object;

  @Prop({ type: Object })
  last_active_time: object;

  @Prop([String])  // Array of strings for followed
  followed: string[];

  @Prop([String])  // Array of strings for followed_by
  followed_by: string[];

  @Prop()
  userSteps: number;

  @Prop()
  lastContribution: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
