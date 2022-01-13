import { Assert } from '@domain/common/Assert';
import { Code } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';
import {
  TUpdateSuperMarketPort,
  TUpdateSuperMarketUseCase,
} from '@domain/supermarkets/usecases/UpdateSuperMarket';
import { IHandler } from '@presentation/common/Handler';
import { handlerWrapper, THttpResponse } from '@presentation/common/Http';
import { IValidator } from '@presentation/common/Validator';
import { SuperMarketViewModel } from '../viewmodels/SuperMarketViewModel';

export class UpdateSuperMarketHandler implements IHandler {
  constructor(
    private readonly updateSuperMarketValidator: IValidator,
    private readonly updateSuperMarketUseCase: TUpdateSuperMarketUseCase,
  ) {}

  async handle(
    data: TUpdateSuperMarketPort,
  ): Promise<THttpResponse<SuperMarketViewModel>> {
    return handlerWrapper<SuperMarketViewModel>(async () => {
      const error =
        this.updateSuperMarketValidator.validate<TUpdateSuperMarketPort>(data);

      Assert.isValid(error, new Exception(Code.BAD_REQUEST_ERROR, error));

      const superMarket = await this.updateSuperMarketUseCase.execute(data);

      return SuperMarketViewModel.map(superMarket);
    }, Code.SUCCESS);
  }
}
