export class UtilFieldFormatter {
  static singleSpace(value: string) {
    return value.trim().replace(/\s+/g, " ");
  }
  static capitalize(value: string): string {
    if (!value) return "";
    return UtilFieldFormatter.singleSpace(value)
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
