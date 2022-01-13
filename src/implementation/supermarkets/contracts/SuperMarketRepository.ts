import { TNullable } from '@implementation/common/RepositoryReturn';
import { TSuperMarketDto } from './SuperMarketDto';

export interface SuperMarketRepository {
  findAllSuperMarkets(): Promise<Array<TSuperMarketDto>>;

  findSuperMarket(id: string): Promise<TNullable<TSuperMarketDto>>;

  createSuperMarket(
    data: Omit<TSuperMarketDto, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<TSuperMarketDto>;

  updateSuperMarket(
    data: { id: string } & Partial<Omit<TSuperMarketDto, 'id'>>,
  ): Promise<TSuperMarketDto>;

  deleteSuperMarket(id: string): Promise<void>;
}
