export class UtilGeneral {
  static safeGet<T extends Record<string, any>, K extends string>(
    obj: T,
    key: K,
  ): unknown {
    if (!obj || typeof obj !== "object") return undefined;
    if (!Object.prototype.hasOwnProperty.call(obj, key)) return undefined;
    return obj[key];
  }
}
