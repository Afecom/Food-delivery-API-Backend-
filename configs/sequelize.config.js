import dbEnv from './db.config.cjs'
const devEnv = dbEnv['development']
const prodEnv = dbEnv['production']
import { Sequelize } from 'sequelize'

const devSequelize = new Sequelize(devEnv)
const prodSequelize = new Sequelize(prodEnv)

export default devSequelize