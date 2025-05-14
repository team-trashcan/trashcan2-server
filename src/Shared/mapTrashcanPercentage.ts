import appConfig from '../config'

function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export default function mapTrashcanPercentage(value: number, unclamped?: boolean) {
  return unclamped
    ? mapValue(value, appConfig.percentage.full, appConfig.percentage.empty, 100, 0)
    : Math.max(0, Math.min(100, mapValue(value, 50, 250, 100, 0)))
}
