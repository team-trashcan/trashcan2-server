function mapValue(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export default function mapTrashcanPercentage(value: number) {
  return mapValue(value, 50, 250, 100, 0)
}