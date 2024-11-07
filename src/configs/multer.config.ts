import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterOptions = {
  Storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads/';
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${name}-${randomName}${extension}`);
    },
  }),
  //   fileFilter: (req, file, cb) => {},
  //   limits: { files: 1, fileSize: (1024 * 1024) / 2 },
};
