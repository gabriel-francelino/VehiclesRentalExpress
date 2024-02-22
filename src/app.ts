import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

import { routes } from './app/routes'
import { env } from './env'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(routes)
const port = env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🏍️`)
})
