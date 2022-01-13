export type TCodeDetail = {
  code: number;
  message: string;
};

export class Code {
  public static SUCCESS: TCodeDetail = {
    code: 200,
    message: 'Success.',
  };

  public static CREATED: TCodeDetail = {
    code: 201,
    message: 'Created.',
  };

  public static NO_CONTENT: TCodeDetail = {
    code: 204,
    message: 'No content.',
  };

  public static BAD_REQUEST_ERROR: TCodeDetail = {
    code: 400,
    message: 'Bad request.',
  };

  public static UNAUTHORIZED_ERROR: TCodeDetail = {
    code: 401,
    message: 'Unauthorized.',
  };

  public static FORBIDDEN_ERROR: TCodeDetail = {
    code: 403,
    message: 'Forbidden.',
  };

  public static NOT_FOUND_ERROR: TCodeDetail = {
    code: 404,
    message: 'Not found.',
  };

  public static INTERNAL_SERVER_ERROR: TCodeDetail = {
    code: 500,
    message: 'Internal server error.',
  };
}
