import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PartyLobby extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  lobbyIdgen: string;

  @Prop({ type: [String], required: true })
  players: string[];

  @Prop({ required: true })
  mission_det: string;

  @Prop({ required: true })
  host: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ default: false })
  inQueue: boolean;

  @Prop()
  matchId: string;

  @Prop({ default: 'ongoing' })
  status: string;
}

export const PartyLobbySchema = SchemaFactory.createForClass(PartyLobby);
