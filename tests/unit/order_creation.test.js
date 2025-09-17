import express from 'express'
import request from 'supertest'
import { testDbInstance } from '../../configs/sequelize.config.js'
import initModel from '../../models/index.model.js'
import { createOrder } from '../../controllers/order.controller.js'

const models = initModel(testDbInstance)
const user_model = models['User']
const restaurant_model = models['Restaurant']
const menu_item_model = models['Menu_item']

const app = express()
app.use(express.json())
app.post('/orders', createOrder(models))

describe("Order creation", () => {
    beforeAll(async () => {
        await testDbInstance.authenticate()
        await testDbInstance.sync({force: true})
    })
    beforeEach(async () => {
        await user_model.destroy({where: {}})
        await restaurant_model.destroy({where: {}})
        try {
            await user_model.create({
            id: 16,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'johndoe@123',
            role: 'Customer'
            });
            await restaurant_model.create({
                id: 5,
                name: 'Testaurant'
            });
            await menu_item_model.create({ id: 2, name: 'Pizza', price: 10, restaurant_id: 5 })
        } catch (error) {
            console.log(error)
        }
        
    })
    afterAll(async () => {
        await testDbInstance.close()
    })

    const mock_order_data = {
        user_id: 16,
        restaurant_id: 5,
        items: [
            {menu_item_id: 2, quantity: 3}
        ]
    }

    it("Should create a new order", async () => {
        const res = await request(app)
                        .post('/orders')
                        .send(mock_order_data)
                        .expect(201)

        const order = res.body.order
        const order_item = res.body.order_items[0]
        const message = res.body.message

        expect(message).toBe('Order created successfully')
        expect(order.user_id).toBe(mock_order_data.user_id)
        expect(order.restaurant_id).toBe(mock_order_data.restaurant_id)
        expect(order_item.menu_item_id).toBe(mock_order_data.items[0].menu_item_id)
        expect(order_item.quantity).toBe(mock_order_data.items[0].quantity)
    })
})
