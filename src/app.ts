import express from 'express'

import { routes } from './app/routes'
import { env } from './env'

const app = express()

app.use(express.json())
app.use(routes)
const port = env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
