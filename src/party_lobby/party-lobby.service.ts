import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PartyLobby } from './schemas/party-lobby.schema';
import { CreatePartyLobbyDto } from './dto/create-party-lobby.dto';

@Injectable()
export class PartyLobbyService {
  constructor(@InjectModel(PartyLobby.name) private readonly partyLobbyModel: Model<PartyLobby>) {}

  async create(createPartyLobbyDto: CreatePartyLobbyDto): Promise<PartyLobby> {
    const createdPartyLobby = new this.partyLobbyModel(createPartyLobbyDto);
    return createdPartyLobby.save();
  }

  async findAll(): Promise<PartyLobby[]> {
    return this.partyLobbyModel.find().exec();
  }

  async findByMatchId(matchId: string): Promise<PartyLobby> {
    return this.partyLobbyModel.findOne({ matchId }).exec();
  }
}
