export default function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}
