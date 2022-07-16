import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { EntityEnum } from '../favs/interfaces/entity.enum';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
  ) {}

  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const album: Album = {
      ...createAlbumDto,
      id: v4(),
    };
    this.albums.push(album);
    return album;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((item) => id === item.id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException(`Album with id:${id} doesn't exist`);
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    if (album) {
      return { ...album, ...updateAlbumDto, id: album.id };
    }
  }

  remove(id: string) {
    if (this.findOne(id)) {
      this.albums = this.albums.filter((album) => album.id !== id);
      this.trackService.makeNull(id, 'albumId');
      this.favsService.isIncluded(id, EntityEnum.Album);
    }
  }

  check(albumsId: string) {
    if (this.albums.some(({ id }) => id === albumsId)) {
      return true;
    } else {
      throw new UnprocessableEntityException(`id:${albumsId} doesn't exist`);
    }
  }
}
