import express from 'express'
import indexRouter from './routes/index.route.js'
import { devSequelize } from './configs/sequelize.config.js'

const app = express()
app.use(express.json())
app.use('/api/v1', indexRouter)

const initDatabase = async () => {
    try {
        await devSequelize.authenticate()
        console.log("Dev environment db connected successfully")
    } catch (error) {
       console.log("database connection error", error)
       process.exit(1) 
    }
}

initDatabase()


app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})