import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartyLobbyController } from './party-lobby.controller';
import { PartyLobbyService } from './party-lobby.service';
import { PartyLobby, PartyLobbySchema } from './schemas/party-lobby.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PartyLobby.name, schema: PartyLobbySchema }]),
  ],
  controllers: [PartyLobbyController],
  providers: [PartyLobbyService],
})
export class PartyLobbyModule {}
