import type { FieldValidationParameters } from "../types/forms";

export class UtilFieldValidator {
  static code({ sanitizedValue }: FieldValidationParameters) {
    if (/\s/.test(sanitizedValue)) {
      return { isSuccess: false, error: "El código no debe contener espacios" };
    }
    if (!/^[A-Za-z0-9]+$/.test(sanitizedValue)) {
      return {
        isSuccess: false,
        error: "El código solo puede contener letras y números",
      };
    }
    if (sanitizedValue.length < 3) {
      return {
        isSuccess: false,
        error: "El código debe tener al menos 3 caracteres",
      };
    }
    return { isSuccess: true };
  }

  static name({ sanitizedValue }: FieldValidationParameters) {
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(sanitizedValue)) {
      return { isSuccess: false, error: "Solo se permiten letras y espacios" };
    }

    if (sanitizedValue.length < 2) {
      return { isSuccess: false, error: "Debe contener al menos 2 caracteres" };
    }

    return { isSuccess: true };
  }
  static birthdate(
    { sanitizedValue }: FieldValidationParameters,
    config?: { isRequired: boolean },
  ) {
    if (!sanitizedValue) {
      const isRequired = config?.isRequired ?? true;
      return {
        isSuccess: !isRequired,
        error: isRequired ? "La fecha es obligatoria" : "",
      };
    }

    const date = new Date(sanitizedValue);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return { isSuccess: false, error: "Fecha inválida" };
    }

    if (date >= now) {
      return {
        isSuccess: false,
        error: "La fecha debe ser en el pasado",
      };
    }

    if (date < new Date("1900-01-01")) {
      return { isSuccess: false, error: "Fecha demasiado antigua" };
    }

    return { isSuccess: true };
  }

  static phone({ originalValue }: FieldValidationParameters) {
    if (!originalValue) {
      return { isSuccess: false, error: "El teléfono es obligatorio" };
    }

    const value = originalValue.trim();

    // Permite:
    // +CCC XXXX XXXX
    // XXXX-XXXX
    // XXXX XXXX
    // 8+ dígitos en general
    const regex = /^(\+\d{1,4}\s?)?(\d{4}[-\s]?\d{4}|\d{7,12})$/;

    if (!regex.test(value)) {
      return {
        isSuccess: false,
        error:
          "Formato de teléfono inválido. Ejemplos válidos: 9999-9999, 9999 9999, +504 9999 9999",
      };
    }

    return { isSuccess: true };
  }

  static date(
    { sanitizedValue }: FieldValidationParameters,
    config?: { isRequired?: boolean },
  ) {
    const isRequired = config?.isRequired ?? true;

    if (!sanitizedValue) {
      return {
        isSuccess: !isRequired,
        error: isRequired ? "La fecha es obligatoria" : "",
      };
    }

    const date = new Date(sanitizedValue);

    if (isNaN(date.getTime())) {
      return { isSuccess: false, error: "Fecha inválida" };
    }

    return { isSuccess: true };
  }

  static endDateAfterStart({
    sanitizedValue,
    sanitizedEntries,
  }: FieldValidationParameters) {
    if (!sanitizedValue) {
      return {
        isSuccess: false,
        error: "La fecha de finalización es obligatoria",
      };
    }

    const end = new Date(sanitizedValue);
    const startRaw = sanitizedEntries?.start_date;
    const start = startRaw ? new Date(startRaw) : null;

    if (isNaN(end.getTime())) {
      return { isSuccess: false, error: "Fecha de finalización inválida" };
    }

    // si no hay fecha de inicio aún, no truena aquí
    if (!start) return { isSuccess: true };

    if (isNaN(start.getTime())) {
      return {
        isSuccess: false,
        error: "La fecha de inicio es inválida",
      };
    }

    if (end <= start) {
      return {
        isSuccess: false,
        error: "La fecha de finalización debe ser mayor que la fecha de inicio",
      };
    }

    return { isSuccess: true };
  }

  static compose(
    ...validators: ((params: FieldValidationParameters) => {
      isSuccess: boolean;
      error?: string;
    })[]
  ) {
    return (params: FieldValidationParameters) => {
      for (const validate of validators) {
        const result = validate(params);
        if (!result.isSuccess) return result;
      }

      return { isSuccess: true };
    };
  }
}
