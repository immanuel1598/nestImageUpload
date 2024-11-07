import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Bien } from 'src/bien/entities/bien.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepo: Repository<Image>,
  ) {}

  // Create images for a Bien
  async createImages(bien: Bien, filenames: string[]): Promise<Image[]> {
    const images = filenames.map((filename) => {
      const image = new Image();
      image.url = filename;
      image.bien = bien;
      return image;
    });

    return await this.imageRepo.save(images);
  }
  create(files: CreateImageDto) {}
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
