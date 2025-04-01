import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const upload = async (
  imageBuffer: Buffer<ArrayBufferLike>,
  name: string,
  folder: string
) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: getPublicId(name, folder),
          asset_folder: folder,
          resource_type: 'image',
          overwrite: true
        },
        (error, result) => {
          if (error || !result) reject();
          else resolve(result);
        }
      )
      .end(imageBuffer);
  });
};

const remove = async (name: string, folder: string) => {
  return new Promise<{ result: string }>((resolve, reject) => {
    cloudinary.uploader.destroy(
      getPublicId(name, folder),
      { resource_type: 'image' },
      (error, result) => {
        if (error || !result) reject();
        else resolve(result);
      }
    );
  });
};

const getPublicId = (name: string, folder: string): string => {
  return folder.split('/').join('-') + '-' + name;
};

export default {
  upload,
  remove
};
