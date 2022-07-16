import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  exports: [ArtistService],
  imports: [forwardRef(() => FavsModule), TrackModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
