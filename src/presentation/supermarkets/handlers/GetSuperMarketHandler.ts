import { Code } from '@domain/common/Code';
import { TGetSuperMarketUseCase } from '@domain/supermarkets/usecases/GetSuperMarket';
import { IHandler } from '@presentation/common/Handler';
import { handlerWrapper, THttpResponse } from '@presentation/common/Http';
import { SuperMarketViewModel } from '../viewmodels/SuperMarketViewModel';

export class GetSuperMarketHandler implements IHandler {
  constructor(private readonly getSuperMarketUseCase: TGetSuperMarketUseCase) {}

  async handle({
    id,
  }: {
    id: string;
  }): Promise<THttpResponse<SuperMarketViewModel>> {
    return handlerWrapper<SuperMarketViewModel>(async () => {
      const superMarket = await this.getSuperMarketUseCase.execute({ id });

      return SuperMarketViewModel.map(superMarket);
    }, Code.SUCCESS);
  }
}
