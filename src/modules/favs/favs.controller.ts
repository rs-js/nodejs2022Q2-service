import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { EntityEnum } from './interfaces/entity.enum';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, EntityEnum.Album);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, EntityEnum.Artist);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.add(id, EntityEnum.Track);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.remove(id, EntityEnum.Album);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.remove(id, EntityEnum.Artist);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.remove(id, EntityEnum.Track);
  }
}
