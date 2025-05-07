export interface IncomingSensorData {
  name: string
  data: number
}
export const incomingSensorData = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'number' },
]

export interface SensorData {
  name: string
  data: number
  estimatedTimeOfFull: string
}
export const sensorData = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'number' },
  { key: 'estimatedTimeOfFull', type: 'string' },
]

export interface SensorDataPercentage {
  name: string
  percentageFill: number
  estimatedTimeOfFull: string
}
export const sensorDataPercentage = [
  { key: 'name', type: 'string' },
  { key: 'percentageFill', type: 'number' },
  { key: 'estimatedTimeOfFull', type: 'string' },
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
export const sensorStatisticFileStructure = [
  { key: 'name', type: 'string' },
  { key: 'data', type: 'array', items: sensorStatisticPercentage },
]
