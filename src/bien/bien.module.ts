import { Module } from '@nestjs/common';
import { BienService } from './bien.service';
import { BienController } from './bien.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bien } from './entities/bien.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from 'src/configs/multer.config';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bien, Image]),
    MulterModule.register({
      storage: MulterOptions.Storage, // Use the Storage option from MulterOptions
    }),
  ],
  controllers: [BienController],
  providers: [BienService, ImageService],
})
export class BienModule {}
