export default function hasPropertiesOfType<T>(object: unknown): object is T {
  if (typeof object === 'object' && object !== null) {
    const keys: (keyof T)[] = Object.keys(object) as (keyof T)[]
    for (const key of keys) {
      if (!(key in object)) return false
    }
  }
  return true
}
