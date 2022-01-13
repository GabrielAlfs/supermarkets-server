import { IUseCase } from '@domain/common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TGetSuperMarketListUseCase = IUseCase<
  null,
  Array<SuperMarketEntity>
>;
