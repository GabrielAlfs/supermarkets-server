export class Assert {
  public static isTrue(condition: boolean, exception: Error): void {
    if (!condition) {
      throw exception;
    }
  }

  public static isFalse(condition: boolean, exception: Error): void {
    if (condition) {
      throw exception;
    }
  }

  public static notEmpty<Entity>(
    entity: Entity | null | undefined,
    exception: Error,
  ): Entity {
    if (entity === null || entity === undefined) {
      throw exception;
    }
    return entity;
  }

  public static isValid(
    validationResult: string | undefined,
    exception: Error,
  ): void {
    if (validationResult) {
      throw exception;
    }
  }
}
