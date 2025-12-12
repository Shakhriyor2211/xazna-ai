import millify from "millify";

export function useMillify(
  value: number,
  precision = 1,
  floorValue = true
): string {
  const raw = millify(value, { precision: precision + 2, lowercase: false });

  const match = raw.match(/([\d.]+)([a-zA-Z]*)/);
  if (!match) return value.toString();

  const [, num, suffix] = match;
  const numeric = parseFloat(num);
  const factor = Math.pow(10, precision);

  const processed = floorValue
    ? Math.floor(numeric * factor) / factor
    : Math.round(numeric * factor) / factor;

  let formatted = processed.toFixed(precision).replace(/\.?0+$/, "");

  return `${formatted}${suffix}`;
}
