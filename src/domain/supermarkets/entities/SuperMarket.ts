import { TEntity } from '@domain/common/Entity';

export type TSuperMarketLocation = {
  street: string;
  number: string;
  district: string;
  zip: string;
  country: string;
  city: string;
  state: string;
};

export interface SuperMarketEntity extends TEntity {
  name: string;
  main_image: string;
  additional_images: Array<string>;
  location: TSuperMarketLocation;
  short_description: string;
  phone: string;
}
