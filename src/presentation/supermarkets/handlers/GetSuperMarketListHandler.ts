import { Code } from '@domain/common/Code';
import { TGetSuperMarketListUseCase } from '@domain/supermarkets/usecases/GetSuperMarketList';
import { IHandler } from '@presentation/common/Handler';
import { handlerWrapper, THttpResponse } from '@presentation/common/Http';
import { SuperMarketViewModel } from '../viewmodels/SuperMarketViewModel';

export class GetSuperMarketListHandler implements IHandler {
  constructor(
    private readonly getSuperMarketListUseCase: TGetSuperMarketListUseCase,
  ) {}

  async handle(): Promise<THttpResponse<Array<SuperMarketViewModel>>> {
    return handlerWrapper<Array<SuperMarketViewModel>>(async () => {
      const superMarkets = await this.getSuperMarketListUseCase.execute();

      return SuperMarketViewModel.mapCollection(superMarkets);
    }, Code.SUCCESS);
  }
}
