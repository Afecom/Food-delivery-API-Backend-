import argon from 'argon2'
import jwt from 'jsonwebtoken'

export const signUp = (models) => {
    return async (req, res) => {
        const User = models['User']
        const body = req.body
        const { first_name, last_name, email, password, role } = body
        if (!first_name || !last_name || !email || !password) return res.status(400).json({message: "Please provide your full information"})

        try {
            const hashed_password = await argon.hash(password)
            const createdUser = await User.create({first_name, last_name, email, password: hashed_password, role})
            const userObj = createdUser.get({plain: true})
            const {password: pwd, ...rstUser} = userObj
            res.status(201).json({
                message: "User created Successfully",
                User: rstUser
            })
        } catch (error) {
            res.status(400).json({
                message: "Couldn't create the user",
                error: error.message || error
            })
        }

    }
} 
export const login = (models) => {
    return async (req, res) => {}
} 