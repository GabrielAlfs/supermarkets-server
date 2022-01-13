import { Assert } from '@domain/common/Assert';
import { Code } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';
import {
  TCreateSuperMarketPort,
  TCreateSuperMarketUseCase,
} from '@domain/supermarkets/usecases/CreateSuperMarket';
import { IHandler } from '@presentation/common/Handler';
import { handlerWrapper, THttpResponse } from '@presentation/common/Http';
import { IValidator } from '@presentation/common/Validator';
import { SuperMarketViewModel } from '../viewmodels/SuperMarketViewModel';

export class CreateSuperMarketHandler implements IHandler {
  constructor(
    private readonly createSuperMarketValidator: IValidator,
    private readonly createSuperMarketUseCase: TCreateSuperMarketUseCase,
  ) {}

  async handle(
    data: TCreateSuperMarketPort,
  ): Promise<THttpResponse<SuperMarketViewModel>> {
    return handlerWrapper<SuperMarketViewModel>(
      async (): Promise<SuperMarketViewModel> => {
        const error =
          this.createSuperMarketValidator.validate<TCreateSuperMarketPort>(
            data,
          );

        Assert.isValid(error, new Exception(Code.BAD_REQUEST_ERROR, error));

        const superMarket = await this.createSuperMarketUseCase.execute(data);

        return SuperMarketViewModel.map(superMarket);
      },
      Code.CREATED,
    );
  }
}
