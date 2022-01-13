import { Code, TCodeDetail } from '@domain/common/Code';
import { Exception } from '@domain/common/Exception';

export type THttpResponse<ResponseBody = any> = {
  statusCode: number;
  body: ResponseBody | { message: string };
};

export const handlerWrapper = async <Return>(
  fn: () => Promise<Return>,
  code?: TCodeDetail,
): Promise<THttpResponse<Return>> => {
  try {
    const response = await fn();

    return {
      statusCode: code ? code.code : Code.SUCCESS.code,
      body: response,
    };
  } catch (error) {
    if (error instanceof Exception) {
      return {
        statusCode: error.code,
        body: {
          message: error.message,
        },
      };
    }

    throw error;
  }
};
