import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PartyLobbyService } from './party-lobby.service';
import { CreatePartyLobbyDto } from './dto/create-party-lobby.dto';
import { PartyLobby } from './schemas/party-lobby.schema';

@Controller('party-lobby')
export class PartyLobbyController {
  constructor(private readonly partyLobbyService: PartyLobbyService) {}

  @Post()
  async createPartyLobby(@Body() createPartyLobbyDto: CreatePartyLobbyDto): Promise<PartyLobby> {
    return this.partyLobbyService.create(createPartyLobbyDto);
  }

  @Get()
  async getAllLobbies(): Promise<PartyLobby[]> {
    return this.partyLobbyService.findAll();
  }

  // Updated to use matchId instead of id
  @Get('match/:matchId')
  async getLobbyByMatchId(@Param('matchId') matchId: string): Promise<PartyLobby> {
    return this.partyLobbyService.findByMatchId(matchId);
  }
}
