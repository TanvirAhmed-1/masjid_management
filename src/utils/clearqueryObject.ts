// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clearqueryObject<T extends Record<string, any>>(
  obj?: T
): Partial<T> | undefined {
  if (!obj) return undefined;

  const cleaned = Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== undefined && v !== null
    )
  ) as Partial<T>; 

  return Object.keys(cleaned).length ? cleaned : undefined;
}
