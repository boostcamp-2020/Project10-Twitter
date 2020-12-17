import fs, { createWriteStream, ReadStream } from 'fs';

interface File {
  file: {
    createReadStream(): ReadStream;
    filename: string;
    mimetype: string;
    encoding: string;
  };
}

const imgUpload = async (_: any, { file: { file: imgFile } }: any) => {
  const { createReadStream, filename } = await imgFile;

  !fs.existsSync('uploads') && fs.mkdirSync('uploads');

  const stream = createReadStream();
  const newFilename = new Date().getTime().toString() + filename;

  await new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(`uploads/${newFilename}`))
      .on('error', reject)
      .on('finish', resolve);
  });

  const IMG_URL =
    process.env.NODE_ENV === 'development' ? process.env.DEV_IMG_URL : process.env.PRO_IMG_URL;

  return { img_url: IMG_URL + newFilename };
};

export { imgUpload };
