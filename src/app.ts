import express from 'express'
import bodyParser from 'body-parser'
import errorMiddleware from './errorMiddleware'
import notFoundMiddleware from './notFoundMiddleware'
import swaggerUi, { JsonObject } from 'swagger-ui-express'
import YAML from 'yamljs'

import statusApi from './Api/StatusApi'
import sensorApi from './Api/SensorApi'

const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '10mb' }))

app.use('/v1/', statusApi)
app.use('/v1/trashcan-fill-height', sensorApi)

const swaggerDocument = YAML.load('./swagger.yaml') as JsonObject
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(errorMiddleware)
app.use(notFoundMiddleware)

export default app
