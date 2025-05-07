import logger from '../logger'

interface ExpectedStructure {
  key: string
  type: string
  items?: ExpectedStructure[]
}

export default function hasPropertiesOfType<T>(
  object: unknown,
  expectedStructure: ExpectedStructure[],
  depth = 0
): object is T {
  if (depth > 20) {
    logger.warn('Exceeded recursion limit when type checking object with nestled arrays, not passing')
    return false
  }

  if (typeof object !== 'object' || object === null) return false

  for (const expected of expectedStructure) {
    if (!(expected.key in object)) return false
    const objectValue = object[expected.key as keyof typeof object] as unknown

    if (expected.type !== 'array') {
      if (!(typeof objectValue === expected.type)) return false
    } else {
      if (!Array.isArray(objectValue) || expected.items === undefined) return false
      for (const arrayItem of objectValue) {
        if (!hasPropertiesOfType(arrayItem, expected.items, depth + 1)) return false
      }
    }
  }

  return true
}
