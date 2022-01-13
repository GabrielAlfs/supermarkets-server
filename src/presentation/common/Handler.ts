import { THttpResponse } from '@presentation/common/Http';

export interface IHandler<Request = Record<string, unknown>> {
  handle(request?: Request): Promise<THttpResponse>;
}
