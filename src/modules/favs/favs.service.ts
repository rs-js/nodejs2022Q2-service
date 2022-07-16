import { Injectable, NotFoundException } from '@nestjs/common';
import { Favorites } from './entities/fav.entity';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { FavoritesResponse } from './interfaces/favResponse';
import { EntityEnum } from './interfaces/entity.enum';

@Injectable()
export class FavsService {
  constructor(
    private readonly albums: AlbumService,
    private readonly artists: ArtistService,
    private readonly tracks: TrackService,
  ) {}

  private favorites: Favorites = { artists: [], albums: [], tracks: [] };

  isIncluded(id: string, prop: EntityEnum) {
    if (this.favorites[prop].includes(id)) {
      this.favorites[prop] = this.favorites[prop].filter(
        (itemId) => itemId !== id,
      );
      return true;
    } else {
      return false;
    }
  }

  add(id: string, prop: EntityEnum) {
    if (this[prop].check(id) && !this.isIncluded(id, prop)) {
      this.favorites[prop].push(id);
      return `${prop.slice(0, -1)} added to favorites`;
    }
  }

  findAll(): FavoritesResponse {
    const albums = this.albums
      .findAll()
      .filter(({ id }) =>
        this.favorites.albums.some((albumId) => albumId === id),
      );
    const artists = this.artists
      .findAll()
      .filter(({ id }) =>
        this.favorites.artists.some((artistId) => artistId === id),
      );
    const tracks = this.tracks
      .findAll()
      .filter(({ id }) =>
        this.favorites.tracks.some((trackId) => trackId === id),
      );
    return { albums, artists, tracks };
  }

  remove(id: string, prop: EntityEnum) {
    if (this.isIncluded(id, prop)) {
      return `${prop.slice(0, -1)} removed from favorites`;
    } else {
      throw new NotFoundException(`${prop.slice(0, -1)} is not favorite`);
    }
  }
}
