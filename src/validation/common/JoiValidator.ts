import Joi from 'joi';

export class JoiValidator {
  protected schema: Joi.ObjectSchema;

  constructor() {
    this.schema = Joi.object({});
  }

  validate<T = Record<string, unknown>>(payload: T): string | undefined {
    const { error } = this.schema.validate(payload);
    return error?.message;
  }
}
