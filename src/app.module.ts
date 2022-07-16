import { Module } from '@nestjs/common';
import { FavsModule } from './modules/favs/favs.module';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavsModule,
  ],
})
export class AppModule {}
