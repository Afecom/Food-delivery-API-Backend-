import dbEnv from './db.config.cjs'
const devEnv = dbEnv['development']
const prodEnv = dbEnv['production']
const testEnv = dbEnv['test']
import { Sequelize } from 'sequelize'

export const devSequelize = new Sequelize(devEnv)
export const prodDbInstance = new Sequelize(prodEnv)
export const testDbInstance = new Sequelize(testEnv)