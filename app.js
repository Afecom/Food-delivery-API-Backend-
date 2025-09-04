import express from 'express'
import indexRouter from './routes/index.route.js'

const app = express()
app.use(express.json())
app.use('/api/v1', indexRouter)


app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})