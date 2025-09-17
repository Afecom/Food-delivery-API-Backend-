import { testDbInstance } from "../../configs/sequelize.config.js";
import initModel from "../../models/index.model.js";
import request from 'supertest'
import express from 'express'
import { signUp, login } from "../../controllers/auth.controller.js";
import { createOrder } from "../../controllers/order.controller.js";
import { isAuthorized } from "../../middlewares/auth.middleware.js";
import dotenv from 'dotenv'
dotenv.config()

const models = initModel(testDbInstance)
const user_model = models['User']
const restaurant_model = models['Restaurant']
const menu_item_model = models['Menu_item']
const customer_auth = isAuthorized("Customer")

const app = express()
app.use(express.json())
app.post('/signup', signUp(models))
app.post('/login', login(models))
app.post('/orders', customer_auth, createOrder(models))

describe("signup, login and create order", () => {
    beforeAll(async () => {
        await testDbInstance.authenticate()
        await testDbInstance.sync({force: true})
    })
    beforeEach(async () => {
        await user_model.destroy({where: {}})
        await restaurant_model.destroy({where: {}})

        try {
            await restaurant_model.create({
                id: 1,
                name: "Testaurant"
            })
            await menu_item_model.create({ id: 2, name: 'Pizza', price: 10, restaurant_id: 1 })
        } catch (error) {
            console.log(error)
        }
    })
    afterAll(async () => {
        await testDbInstance.close()
    })

    it("Should signup, login and create an order", async () => {
        const mock_user_signup_data = {
            first_name: "John",
            last_name: "Doe",
            email: "johndoe123@example.com",
            password: "johndoe@123",
        }
        const signup_res = await request(app)
                                .post('/signup')
                                .send(mock_user_signup_data)
                                .expect(201)
      
        const registered_user = signup_res.body.user
        const signUp_message = signup_res.body.message
        expect(signUp_message).toBe("User created Successfully")
        expect(registered_user.first_name).toBe(mock_user_signup_data.first_name)
        expect(registered_user.last_name).toBe(mock_user_signup_data.last_name)
        expect(registered_user.email).toBe(mock_user_signup_data.email)

        const user_login_data = {
            email: "johndoe123@example.com",
            password: "johndoe@123"
        }
        const login_res = await request(app)
                                    .post('/login')
                                    .send(user_login_data)
                                    .expect(200)
        
        const login_message = login_res.body.message
        const loggedin_user = login_res.body.user

        expect(login_res.body).toHaveProperty("access_token")
        expect(login_res.body).toHaveProperty("refresh_token")
        expect(login_message).toBe("User logged in successfully")
        expect(loggedin_user).toHaveProperty("id")
        expect(loggedin_user.first_name).toBe(mock_user_signup_data.first_name)
        expect(loggedin_user.last_name).toBe(mock_user_signup_data.last_name)
        expect(loggedin_user.email).toBe(mock_user_signup_data.email)
        expect(loggedin_user.role).toBe("Customer")

        const mock_order_data = {
            user_id: loggedin_user.id,
            restaurant_id: 1,
            items: [
                {menu_item_id: 2, quantity: 3}
            ]
        }
        const access_token = login_res.body.access_token

        const order_res = await request(app)
                                    .post('/orders')
                                    .set("Authorization", `Bearer ${access_token}`)
                                    .send(mock_order_data)
                                    .expect(201)

        const order = order_res.body.order
        const order_item = order_res.body.order_items[0]
        const message = order_res.body.message

        expect(message).toBe('Order created successfully')
        expect(order.user_id).toBe(mock_order_data.user_id)
        expect(order.restaurant_id).toBe(mock_order_data.restaurant_id)
        expect(order_item.menu_item_id).toBe(mock_order_data.items[0].menu_item_id)
        expect(order_item.quantity).toBe(mock_order_data.items[0].quantity)
    })
})
