import {
  TCreateSuperMarketPort,
  TCreateSuperMarketUseCase,
} from '@domain/supermarkets/usecases/CreateSuperMarket';
import { FileUploader } from '@implementation/common/FileUploader';
import { TSuperMarketDto } from '../contracts/SuperMarketDto';
import { SuperMarketRepository } from '../contracts/SuperMarketRepository';

export class CreateSuperMarketService implements TCreateSuperMarketUseCase {
  constructor(
    private readonly superMarketRepository: SuperMarketRepository,
    private readonly fileUploader: FileUploader,
  ) {}

  async execute({
    additional_images,
    city,
    country,
    district,
    main_image,
    name,
    number,
    phone,
    short_description,
    state,
    street,
    zip,
  }: TCreateSuperMarketPort): Promise<TSuperMarketDto> {
    const mainImage = await this.fileUploader.uploadOne(main_image);

    const additionalImages = await this.fileUploader.uploadMany(
      additional_images,
    );

    const superMarket = await this.superMarketRepository.createSuperMarket({
      name,
      main_image: mainImage.relativePath,
      additional_images: additionalImages.map(
        (additionalImage) => additionalImage.relativePath,
      ),
      location: {
        city,
        country,
        district,
        number,
        state,
        street,
        zip,
      },
      short_description,
      phone,
    });

    return superMarket;
  }
}
