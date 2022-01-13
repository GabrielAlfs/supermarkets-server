import {
  SuperMarketEntity,
  TSuperMarketLocation,
} from '@domain/supermarkets/entities/SuperMarket';

export class SuperMarketViewModel {
  public id: string;

  public superMarketName: string;

  public superMarketMainImage: string;

  public superMarketAdditionalImages: Array<string>;

  public superMarketLocation: TSuperMarketLocation;

  public superMarketDescription: string;

  public superMarketPhone: string;

  public createdAt: string;

  public updatedAt: string;

  public static map = ({
    id,
    name,
    main_image,
    additional_images,
    location,
    short_description,
    phone,
    created_at,
    updated_at,
  }: SuperMarketEntity): SuperMarketViewModel => ({
    id,
    superMarketName: name,
    superMarketMainImage: main_image,
    superMarketAdditionalImages: additional_images,
    superMarketLocation: location,
    superMarketDescription: short_description,
    superMarketPhone: phone,
    createdAt: created_at.toISOString(),
    updatedAt: updated_at.toISOString(),
  });

  public static mapCollection(
    entities: Array<SuperMarketEntity>,
  ): Array<SuperMarketViewModel> {
    return entities.map((entity) => SuperMarketViewModel.map(entity));
  }
}
