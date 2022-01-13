import joi from 'joi';

import { superMarketModel } from '@infrastructure/persistence/mongoose/models/SuperMarketModel';
import { MongooseSuperMarketRepository } from '@infrastructure/persistence/mongoose/repositories/MongooseSuperMarketRepository';
import { S3Connection } from '@infrastructure/persistence/s3/S3Connection';
import { S3MediaFileUploader } from '@infrastructure/persistence/s3/S3MediaFileUploader';
import { IHandler } from '@presentation/common/Handler';
import { JoiCreateUserValidator } from '@validation/supermarkets/JoiCreateSuperMarketValidator';
import { JoiUpdateUserValidator } from '@validation/supermarkets/JoiUpdateSuperMarketValidator';
import {
  CreateSuperMarketService,
  DeleteSuperMarketService,
  GetSuperMarketListService,
  GetSuperMarketService,
  UpdateSuperMarketService,
} from '@implementation/supermarkets/services';
import {
  CreateSuperMarketHandler,
  DeleteSuperMarketHandler,
  GetSuperMarketHandler,
  GetSuperMarketListHandler,
  UpdateSuperMarketHandler,
} from '@presentation/supermarkets/handlers';

// Repositories
const mongooseSuperMarketRepository = new MongooseSuperMarketRepository(
  superMarketModel,
);

// Media File Uploader
const s3Connection = new S3Connection({ region: process.env.AWS_REGION || '' });
const s3MediaFileUploader = new S3MediaFileUploader(
  s3Connection,
  'supermarkets-bucket',
);

// Validators
const createSuperMarketValidator = new JoiCreateUserValidator(joi);
const updateSuperMarketValidator = new JoiUpdateUserValidator(joi);

// Services
const getSuperMarketListService = new GetSuperMarketListService(
  mongooseSuperMarketRepository,
);
const getSuperMarketService = new GetSuperMarketService(
  mongooseSuperMarketRepository,
);
const createSuperMarketService = new CreateSuperMarketService(
  mongooseSuperMarketRepository,
  s3MediaFileUploader,
);
const updateSuperMarketService = new UpdateSuperMarketService(
  mongooseSuperMarketRepository,
  s3MediaFileUploader,
);
const deleteSuperMarketService = new DeleteSuperMarketService(
  mongooseSuperMarketRepository,
  s3MediaFileUploader,
);

type TSuperMarketHandlers =
  | 'GetSuperMarketList'
  | 'GetSuperMarket'
  | 'CreateSuperMarket'
  | 'UpdateSuperMarket'
  | 'DeleteSuperMarket';

export const buildSuperMarketHandler = (
  superMarketHandler: TSuperMarketHandlers,
): IHandler =>
  ({
    GetSuperMarketList: new GetSuperMarketListHandler(
      getSuperMarketListService,
    ),
    GetSuperMarket: new GetSuperMarketHandler(getSuperMarketService),
    CreateSuperMarket: new CreateSuperMarketHandler(
      createSuperMarketValidator,
      createSuperMarketService,
    ),
    UpdateSuperMarket: new UpdateSuperMarketHandler(
      updateSuperMarketValidator,
      updateSuperMarketService,
    ),
    DeleteSuperMarket: new DeleteSuperMarketHandler(deleteSuperMarketService),
  }[superMarketHandler]);
