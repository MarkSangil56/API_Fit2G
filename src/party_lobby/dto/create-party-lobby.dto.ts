import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreatePartyLobbyDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly lobbyIdgen: string;

  @IsArray()
  readonly players: string[];

  @IsString()
  readonly mission_det: string;

  @IsString()
  readonly host: string;

  @IsBoolean()
  @IsOptional()
  readonly inQueue?: boolean;

  @IsString()
  @IsOptional()
  readonly matchId?: string;

  @IsString()
  @IsOptional()
  readonly status?: string;
}
