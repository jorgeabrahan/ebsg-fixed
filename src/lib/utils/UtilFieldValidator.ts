export class UtilFieldValidator {
  static code(sanitizedValue: string) {
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

  static name(sanitizedValue: string) {
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/.test(sanitizedValue)) {
      return { isSuccess: false, error: "Solo se permiten letras y espacios" };
    }

    if (sanitizedValue.length < 2) {
      return { isSuccess: false, error: "Debe contener al menos 2 caracteres" };
    }

    return { isSuccess: true };
  }
  static birthdate(sanitizedValue: string) {
    if (!sanitizedValue) {
      return { isSuccess: false, error: "La fecha es obligatoria" };
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

    // - No permitir fechas absurdas (antes de 1900)
    if (date < new Date("1900-01-01")) {
      return { isSuccess: false, error: "Fecha demasiado antigua" };
    }

    return { isSuccess: true };
  }
}
