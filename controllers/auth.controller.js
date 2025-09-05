import argon from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

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
    return async (req, res) => {
        const body = req.body
        const userModel = models['User']
        const { email, password } = body
        if (!email || !password) return res.status(400).json({message: "Please provide email and password to login"})

        try {
            const user = await userModel.findOne({where: { email }})
            if(!user) return res.status(401).json({message: "Invalid credentials"})
            const is_correct_password = await argon.verify(user.password, password)
            if(!is_correct_password){
                res.status(401).json({message: "Invalid credentials"})
            }
            const access_secret = process.env.JWT_ACCESS_SECRET
            const refresh_secret = process.env.JWT_REFRESH_SECRET
            const access_token = jwt.sign({user_id: user.id, user_role: user.role}, access_secret, {expiresIn: "15m"})
            const refresh_token = jwt.sign({user_id: user.id, user_role: user.role}, refresh_secret, {expiresIn: "7d"})
            const user_obj = user.get({plain: true})
            const {password: pwd, ...rst_user} = user_obj 
            res.status(200).json({
                message: "User logged in successfully",
                access_token: access_token,
                refresh_token: refresh_token,
                user: rst_user
            })
        } catch (error) {
            res.status(400).json({
                message: "Couldn't login the user",
                error: error.message || error
            })
        }
    }
} 