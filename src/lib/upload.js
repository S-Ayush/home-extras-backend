import multer from 'multer';
// import path from 'path';
// import { nanoid } from 'nanoid';

const instance = multer({
  storage: multer.memoryStorage(),

  // storage: multer.diskStorage({
  //   destination: path.join(process.cwd(), 'uploads'),
  //   filename: (req, file, callback) => {
  //     const ext = path.extname(file.originalname);
  //     callback(null, `${nanoid()}${ext}`);
  //   },
  // }),
});

export default instance;
