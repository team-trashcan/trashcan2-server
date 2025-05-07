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
  percentageFill: number
}
export const sensorDataPercentage = [
  { key: 'name', type: 'string' },
  { key: 'percentageFill', type: 'number' },
]

export interface SensorStatisticPercentage {
  date: string
  percentageFill: number
}
export const sensorStatisticPercentage = [
  { key: 'date', type: 'string' },
  { key: 'percentageFill', type: 'number' },
]

export interface SensorStatisticFileStructure {
  name: string
  data: SensorStatisticPercentage[]
}
export const SensorStatisticFileStructure = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'array', items: sensorStatisticPercentage },
]
