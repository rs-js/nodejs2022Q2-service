import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
