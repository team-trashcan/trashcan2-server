export default function hasPropertiesOfType<T>(
  object: unknown,
  expectedStructure: { key: string; type: string }[]
): object is T {
  if (typeof object !== 'object' || object === null) return false

  for (const expected of expectedStructure) {
    if (!(expected.key in object)) return false
    if (!(typeof object[expected.key as keyof typeof object] === expected.type)) return false
  }

  return true
}
