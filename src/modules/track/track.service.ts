import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';
import { EntityEnum } from '../favs/interfaces/entity.enum';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const track: Track = {
      ...createTrackDto,
      id: v4(),
    };
    this.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((item) => id === item.id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException(`Track with id:${id} doesn't exist`);
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);
    if (track) {
      return { ...track, ...updateTrackDto, id: track.id };
    }
  }

  remove(id: string) {
    if (this.findOne(id)) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      this.favsService.isIncluded(id, EntityEnum.Track);
    }
  }

  check(trackId: string) {
    if (this.tracks.some(({ id }) => id === trackId)) {
      return true;
    } else {
      throw new UnprocessableEntityException(`id:${trackId} doesn't exist`);
    }
  }

  makeNull(id: string, prop: 'albumId' | 'artistId') {
    for (const track of this.tracks) {
      if (track[prop] === id) {
        track[prop] = null;
      }
    }
  }
}
