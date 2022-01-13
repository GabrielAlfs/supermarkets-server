import { File } from '@domain/common/File';
import { IUseCase } from '@domain/common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TCreateSuperMarketPort = {
  name: string;
  main_image: File;
  additional_images: Array<File>;
  short_description: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  zip: string;
  country: string;
  city: string;
  state: string;
};

export type TCreateSuperMarketUseCase = IUseCase<
  TCreateSuperMarketPort,
  SuperMarketEntity
>;
