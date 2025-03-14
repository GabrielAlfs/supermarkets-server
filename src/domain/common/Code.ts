export type TCodeDetail = {
  code: number;
  message: string;
};

export class Code {
  public static readonly SUCCESS: TCodeDetail = {
    code: 200,
    message: 'Success.',
  };

  public static readonly CREATED: TCodeDetail = {
    code: 201,
    message: 'Created.',
  };

  public static readonly NO_CONTENT: TCodeDetail = {
    code: 204,
    message: 'No content.',
  };

  public static readonly BAD_REQUEST_ERROR: TCodeDetail = {
    code: 400,
    message: 'Bad request.',
  };

  public static readonly UNAUTHORIZED_ERROR: TCodeDetail = {
    code: 401,
    message: 'Unauthorized.',
  };

  public static readonly FORBIDDEN_ERROR: TCodeDetail = {
    code: 403,
    message: 'Forbidden.',
  };

  public static readonly NOT_FOUND_ERROR: TCodeDetail = {
    code: 404,
    message: 'Not found.',
  };

  public static readonly INTERNAL_SERVER_ERROR: TCodeDetail = {
    code: 500,
    message: 'Internal server error.',
  };
}
