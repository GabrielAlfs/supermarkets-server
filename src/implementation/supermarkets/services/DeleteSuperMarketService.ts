import { Assert } from '@domain/common/Assert';
import { Code } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';
import {
  TDeleteSuperMarketPort,
  TDeleteSuperMarketUseCase,
} from '@domain/supermarkets/usecases/DeleteSuperMarket';
import { FileUploader } from '@implementation/common/FileUploader';
import { TSuperMarketDto } from '../contracts/SuperMarketDto';
import { SuperMarketRepository } from '../contracts/SuperMarketRepository';

export class DeleteSuperMarketService implements TDeleteSuperMarketUseCase {
  constructor(
    private readonly superMarketRepository: SuperMarketRepository,
    private readonly fileUploader: FileUploader,
  ) {}

  async execute({ id }: TDeleteSuperMarketPort): Promise<void> {
    const superMarket = Assert.notEmpty<TSuperMarketDto>(
      await this.superMarketRepository.findSuperMarket(id),
      new Exception(Code.NOT_FOUND_ERROR, 'SuperMarket not found.'),
    );

    this.fileUploader.removeMany([
      ...superMarket.additional_images,
      superMarket.main_image,
    ]);

    await this.superMarketRepository.deleteSuperMarket(id);
  }
}
