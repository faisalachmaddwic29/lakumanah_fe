export default function groupBy<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): { name: T[K]; data: T[] }[] {
  const map = new Map<T[K], T[]>();

  array.forEach(item => {
    const groupKey = item[key];
    if (!map.has(groupKey)) {
      map.set(groupKey, []);
    }
    map.get(groupKey)!.push(item);
  });

  return Array.from(map, ([name, data]) => ({ name, data }));
}