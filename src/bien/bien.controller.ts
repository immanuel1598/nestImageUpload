import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { BienService } from './bien.service';
import { CreateBienDto } from './dto/create-bien.dto';
import { UpdateBienDto } from './dto/update-bien.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { CreateImageDto } from 'src/image/dto/create-image.dto';

@Controller('bien')
export class BienController {
  constructor(private readonly bienService: BienService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10)) // Handles up to 10 files
  async create(
    @Body() createBienDto: CreateBienDto,
    @UploadedFiles() files: Express.Multer.File[], // Array to handle multiple files
  ) {
    if (!files || files.length === 0) throw new Error('No files uploaded');

    // Map file names to `images` array in CreateBienDto
    createBienDto.image = files.map((file) => file.filename);

    // Pass the DTO to BienService to save Bien and associated images
    return await this.bienService.create(createBienDto);
  }

  @Get()
  findAll() {
    return this.bienService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bienService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBienDto: UpdateBienDto) {
    return this.bienService.update(+id, updateBienDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bienService.remove(+id);
  }

  @Get('files/:imageName')
  getImage(@Param('imageName') imageName: string, @Res() res) {
    return this.bienService.getImage(imageName, res);
  }
}
