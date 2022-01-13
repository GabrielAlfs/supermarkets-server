import { SuperMarketEntity } from '@domain/supermarkets/entities/SuperMarket';
import { TGetSuperMarketListUseCase } from '@domain/supermarkets/usecases/GetSuperMarketList';
import { SuperMarketRepository } from '../contracts/SuperMarketRepository';

export class GetSuperMarketListService implements TGetSuperMarketListUseCase {
  constructor(private readonly superMarketRepository: SuperMarketRepository) {}

  async execute(): Promise<Array<SuperMarketEntity>> {
    return this.superMarketRepository.findAllSuperMarkets();
  }
}
