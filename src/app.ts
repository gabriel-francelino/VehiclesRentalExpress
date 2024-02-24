import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

import { routes } from './app/routes'
import { env } from './env'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const app = express()
const corsOptions = {
  origin: 'http://localhost:5173',
}
app.use(cors(corsOptions))

app.use(
  morgan(
    '📅 [:date[iso]] - [:method] - :url - status-code: [:status] - duration: :response-time ms',
  ),
)
app.use(helmet())

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(routes)
const port = env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🏍️`)
})
