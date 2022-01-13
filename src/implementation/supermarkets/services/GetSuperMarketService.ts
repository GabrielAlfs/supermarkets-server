import { Assert } from '@domain/common/Assert';
import { Code } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';
import { SuperMarketEntity } from '@domain/supermarkets/entities/SuperMarket';
import {
  TGetSuperMarketPort,
  TGetSuperMarketUseCase,
} from '@domain/supermarkets/usecases/GetSuperMarket';
import { TSuperMarketDto } from '../contracts/SuperMarketDto';
import { SuperMarketRepository } from '../contracts/SuperMarketRepository';

export class GetSuperMarketService implements TGetSuperMarketUseCase {
  constructor(private readonly superMarketRepository: SuperMarketRepository) {}

  async execute({ id }: TGetSuperMarketPort): Promise<SuperMarketEntity> {
    return Assert.notEmpty<TSuperMarketDto>(
      await this.superMarketRepository.findSuperMarket(id),
      new Exception(Code.NOT_FOUND_ERROR, 'SuperMarket not found.'),
    );
  }
}
