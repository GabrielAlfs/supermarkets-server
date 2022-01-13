export interface IValidator {
  validate<T = Record<string, unknown>>(payload: T): string | undefined;
}
