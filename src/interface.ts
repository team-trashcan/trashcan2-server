export interface SensorData {
  name: string
  data: number
}
export const sensorData = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'number' },
]

export interface SensorDataPercentage {
  name: string
  percentage: number
}
export const sensorDataPercentage = [
  { key: 'name', type: 'string' },
  { key: 'percentage', type: 'number' },
]

export interface SensorStatisticPercentage {
  date: string
  percentage: number
}
export const sensorStatisticPercentage = [
  { key: 'date', type: 'string' },
  { key: 'percentage', type: 'number' },
]

export interface SensorStatisticFileStructure {
  name: string
  data: SensorStatisticPercentage[]
}
export const SensorStatisticFileStructure = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'array', items: sensorStatisticPercentage },
]
