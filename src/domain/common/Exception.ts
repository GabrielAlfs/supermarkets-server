import { TCodeDetail } from '@domain/common/Code';

export class Exception extends Error {
  readonly code: number;

  constructor(codeDetail: TCodeDetail, overrideMessage?: string) {
    super(overrideMessage ?? codeDetail.message);

    this.code = codeDetail.code;
  }
}
