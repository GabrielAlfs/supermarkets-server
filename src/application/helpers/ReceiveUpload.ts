import { File } from '@domain/common/File';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const upload = multer();

const mapFile = (file: Express.Multer.File): File => ({
  content: file.buffer,
  extension: `${file.originalname.split('.').pop()}`,
  size: file.size,
  mimeType: file.mimetype,
});

const multerHandler =
  (fields: Array<multer.Field>) =>
  (request: Request, response: Response, next: NextFunction) => {
    upload.fields(fields)(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        return (
          {
            LIMIT_UNEXPECTED_FILE: () =>
              response.status(400).json({
                message: `Image field ${err.field} has reached the maximum file limit`,
              }),
          } as Record<typeof err.code, () => any>
        )[err.code]();
      }
      if (err) throw err;

      return next();
    });
  };

const fileHandler =
  (fields: Array<multer.Field>) =>
  (request: Request, _: Response, next: NextFunction) => {
    const { files } = request as {
      files: Record<string, Array<Express.Multer.File>>;
    };

    fields.forEach((field) => {
      if (files[field.name]?.length) {
        Object.assign(request.body, {
          [field.name]:
            field.maxCount === 1
              ? mapFile(files[field.name][0])
              : (files[field.name] as Array<Express.Multer.File>).map(
                  (file): File => mapFile(file),
                ),
        });
      } else if (field.maxCount !== 1) {
        Object.assign(request.body, {
          [field.name]: [],
        });
      }
    });

    return next();
  };

export const receiveUpload = (fields: Array<multer.Field>) => [
  multerHandler(fields),
  fileHandler(fields),
];
