import dotenv from 'dotenv'
dotenv.config()
import dbConfig from './db.config.cjs'
const devEnv = dbConfig['development']
const prodEnv = dbConfig['production']
const testEnv = dbConfig['test']
import { Sequelize } from 'sequelize'

export const devSequelize = new Sequelize(
    devEnv.database,
    devEnv.username,
    devEnv.password,
    {
        host: devEnv.host,
        port: devEnv.port,
        dialect: "postgres"
    }
)
export const prodDbInstance = new Sequelize(prodEnv)
export const testDbInstance = new Sequelize(testEnv)