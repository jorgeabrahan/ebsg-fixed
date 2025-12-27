export class UtilFieldFormatter {
  static singleSpace(value: string) {
    return value.trim().replace(/\s+/g, " ");
  }
  static capitalize(value: string): string {
    if (!value) return "";
    console.log(
      UtilFieldFormatter.singleSpace(value)
        .toLocaleLowerCase("es")
        .replace(
          /\p{L}+/gu,
          (word) => word.charAt(0).toLocaleUpperCase("es") + word.slice(1),
        ),
    );
    return UtilFieldFormatter.singleSpace(value)
      .toLocaleLowerCase("es")
      .replace(
        /\p{L}+/gu,
        (word) => word.charAt(0).toLocaleUpperCase("es") + word.slice(1),
      );
  }

  static sanitizePhone(value: string, defaultCountryCode = "+504"): string {
    if (!value) return "";

    // limpiar basura
    let cleaned = value.replace(/[^\d+]/g, "");

    let country = defaultCountryCode;
    let number = "";

    if (cleaned.startsWith("+")) {
      // separar código de país
      // +XXX...
      const match = cleaned.match(/^(\+\d{1,4})(\d+)$/);
      if (match) {
        country = match[1];
        number = match[2];
      }
    } else {
      // sin + usamos default
      number = cleaned.replace(/\D/g, "");
    }

    // Honduras 8 dígitos → XXXX XXXX
    if (number.length === 8) {
      number = number.replace(/(\d{4})(\d{4})/, "$1 $2");
    } else if (number.length === 10) {
      number = number.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    } else {
      // fallback → agrupar cada 3–4
      number = number.replace(/(.{4})/g, "$1 ").trim();
    }

    return `${country} ${number}`;
  }
  static feeCode(value: string) {
    if (!value) return "";
    return value.trim().toUpperCase();
  }
}
