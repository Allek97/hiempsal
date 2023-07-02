export function setTextPlural(text: string, nbUnits: number): string {
    if (nbUnits > 1) return text + "s";
    return text;
}
