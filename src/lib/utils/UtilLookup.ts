export class UtilLookup {
  static getLabelFromValue<T extends { label: string; value: string }>(
    lookup: readonly T[],
    value: string,
  ): string {
    return lookup.find((i) => i.value === value)?.label ?? value;
  }

  static getValueFromLabel<T extends { label: string; value: string }>(
    lookup: readonly T[],
    label: string,
  ): string {
    return lookup.find((i) => i.label === label)?.value ?? label;
  }
}
