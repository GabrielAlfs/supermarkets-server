import { Code } from '@domain/common/Code';
import { TDeleteSuperMarketUseCase } from '@domain/supermarkets/usecases/DeleteSuperMarket';
import { IHandler } from '@presentation/common/Handler';
import { handlerWrapper, THttpResponse } from '@presentation/common/Http';

export class DeleteSuperMarketHandler implements IHandler {
  constructor(
    private readonly deleteSuperMarketUseCase: TDeleteSuperMarketUseCase,
  ) {}

  async handle({ id }: { id: string }): Promise<THttpResponse<void>> {
    return handlerWrapper<void>(async () => {
      await this.deleteSuperMarketUseCase.execute({ id });
    }, Code.NO_CONTENT);
  }
}
