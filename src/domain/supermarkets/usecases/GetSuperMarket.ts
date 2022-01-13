import { IUseCase } from '@domain/common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TGetSuperMarketPort = {
  id: string;
};

export type TGetSuperMarketUseCase = IUseCase<
  TGetSuperMarketPort,
  SuperMarketEntity
>;
