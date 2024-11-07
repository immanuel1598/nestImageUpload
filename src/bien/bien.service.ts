import { Injectable } from '@nestjs/common';
import { CreateBienDto } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bien } from './entities/bien.entity';
import { join } from 'path';
import { Response } from 'express';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class BienService {
  constructor(
    @InjectRepository(Bien)
    private bienRepo: Repository<Bien>,
    private imageService: ImageService,
  ) {}

  async create(createBienDto: CreateBienDto) {
    // Step 1: Create and save the Bien entity
    const bien = this.bienRepo.create(createBienDto);
    const savedBien = await this.bienRepo.save(bien);

    // Step 2: Use ImageService to create and save images for the Bien
    if (createBienDto.image && createBienDto.image.length > 0) {
      await this.imageService.createImages(savedBien, createBienDto.image);
    }

    return savedBien;
  }
  async findAll() {
    return await this.bienRepo.find();
  }

  async findOne(id: number) {
    return await this.bienRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBienDto: UpdateBienDto) {
    return await this.bienRepo.update(id, updateBienDto);
  }

  async remove(id: number) {
    return await this.bienRepo.delete(id);
  }

  getImage(imageName: string, res: Response) {
    const filePath = join(process.cwd(), 'uploads', imageName);
    console.log(filePath);
    return res.sendFile(filePath);
  }
}
