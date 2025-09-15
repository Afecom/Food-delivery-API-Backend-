import express from 'express'
import request from 'supertest'
import { signUp } from '../../controllers/auth.controller.js'
import { testDbInstance } from '../../configs/sequelize.config.js'
import initModel from '../../models/index.model.js'

const models = initModel(testDbInstance)
const user_model = models['User']

const app = express()
app.use(express.json())
app.post('/users', signUp(models))

describe("User registration", () => {
    beforeAll(async () => {
        await testDbInstance.authenticate()
        await testDbInstance.sync({force: true})
    })
    beforeEach(async () => {
        await user_model.destroy({where: {}})
    })
    afterAll(async () => {
        await testDbInstance.close()
    })

    const mock_user_data = {
        first_name: "john",
        last_name: "doe",
        email: "johndoe@gmail.com",
        password: "johndoe@123",
        role: "Admin"
    }

    it("Should create a new user", async () => {
        const res = await request(app)
                    .post('/users')
                    .send(mock_user_data)
                    .expect(201)

        const user = res.body.user
        expect(res.body).toHaveProperty('message')
        expect(user.first_name).toBe(mock_user_data.first_name)
        expect(user.last_name).toBe(mock_user_data.last_name)
        expect(user.email).toBe(mock_user_data.email)
        expect(user.role).toBe(mock_user_data.role)
    })
})