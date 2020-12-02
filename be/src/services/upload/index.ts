import fs, { createWriteStream, ReadStream } from 'fs';

interface File {
  file: {
    createReadStream(): ReadStream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
}

const imgUpload = async (_: any, { file }: File) => {
  const { createReadStream, filename } = await file;

  !fs.existsSync('uploads') && fs.mkdirSync('uploads');

  const stream = createReadStream();
  const newFilename = new Date().getTime().toString() + filename;

  await new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(`uploads/${newFilename}`))
      .on('error', reject)
      .on('finish', resolve);
  });

  return { img_url: process.env.DEV_IMG_URL + newFilename };
};

export { imgUpload };
