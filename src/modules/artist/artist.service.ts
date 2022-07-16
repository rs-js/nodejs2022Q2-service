import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { EntityEnum } from '../favs/interfaces/entity.enum';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
  ) {}

  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      ...createArtistDto,
      id: v4(),
    };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((item) => id === item.id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException(`Artist with id:${id} doesn't exist`);
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);
    if (artist) {
      return { ...artist, ...updateArtistDto, id: artist.id };
    }
  }

  remove(id: string) {
    if (this.findOne(id)) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      this.trackService.makeNull(id, 'artistId');
      this.favsService.isIncluded(id, EntityEnum.Artist);
    }
  }

  check(artistId: string) {
    if (this.artists.some(({ id }) => id === artistId)) {
      return true;
    } else {
      throw new UnprocessableEntityException(`id:${artistId} doesn't exist`);
    }
  }
}
