import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verify_token = (token, type) => {
    try {
        const is_valid_token = jwt.verify(token, type === "access" ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET)
        return is_valid_token
    } catch (error) {
        return null
    }
}

export default verify_token