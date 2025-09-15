import express from 'express'
import indexRouter from './routes/index.route.js'
import { devSequelize } from './configs/sequelize.config.js'
import redis from './configs/redis.config.js'

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

redis.on("connecting", () => {
    console.log("redis connecting...")
})

redis.on("connect", () => {
    console.log("redis connected successfully")
})

redis.on("ready", () => {
    console.log("redis is ready to use")
})

redis.on("error", (error) => {
    console.log("an error occured while trying to connect to redis", error)
})

redis.on("reconnecting", () => {
    console.log("redis is reconnecting...")
})

redis.on("close", () => {
    console.log("redis closed")
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})