import { Module, forwardRef } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';

@Module({
  exports: [FavsService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
