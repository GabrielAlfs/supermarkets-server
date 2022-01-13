import { Assert } from '@domain/common/Assert';
import { Code } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';
import { SuperMarketEntity } from '@domain/supermarkets/entities/SuperMarket';
import {
  TUpdateSuperMarketPort,
  TUpdateSuperMarketUseCase,
} from '@domain/supermarkets/usecases/UpdateSuperMarket';
import { FileUploader } from '@implementation/common/FileUploader';
import { TSuperMarketDto } from '../contracts/SuperMarketDto';
import { SuperMarketRepository } from '../contracts/SuperMarketRepository';

export class UpdateSuperMarketService implements TUpdateSuperMarketUseCase {
  constructor(
    private readonly superMarketRepository: SuperMarketRepository,
    private readonly fileUploader: FileUploader,
  ) {}

  async execute({
    id,
    main_image,
    additional_images,
    removed_additional_images,
    city,
    country,
    district,
    name,
    number,
    phone,
    short_description,
    state,
    street,
    zip,
  }: TUpdateSuperMarketPort): Promise<SuperMarketEntity> {
    const superMarket = Assert.notEmpty<TSuperMarketDto>(
      await this.superMarketRepository.findSuperMarket(id),
      new Exception(Code.NOT_FOUND_ERROR, 'SuperMarket not found.'),
    );

    if (main_image) {
      await this.fileUploader.removeOne(superMarket.main_image);

      const mainImage = await this.fileUploader.uploadOne(main_image);

      Object.assign(superMarket, {
        main_image: mainImage.relativePath,
      });
    }

    if (removed_additional_images?.length) {
      await this.fileUploader.removeMany(removed_additional_images);

      Object.assign(superMarket, {
        additional_images: superMarket.additional_images.filter(
          (image) => !removed_additional_images.includes(image),
        ),
      });
    }

    if (additional_images?.length) {
      const additionalImages = await this.fileUploader.uploadMany(
        additional_images,
      );

      Object.assign(superMarket, {
        additional_images: [
          ...superMarket.additional_images,
          ...additionalImages.map(
            (additionalImage) => additionalImage.relativePath,
          ),
        ],
      });
    }

    const updatedData = {
      city,
      country,
      district,
      name,
      number,
      phone,
      short_description,
      state,
      street,
      zip,
    };

    Object.keys(updatedData).forEach((key) =>
      updatedData[key as keyof typeof updatedData] === undefined
        ? delete updatedData[key as keyof typeof updatedData]
        : {},
    );

    Object.assign(superMarket, { ...updatedData });

    await this.superMarketRepository.updateSuperMarket(superMarket);

    return superMarket;
  }
}
