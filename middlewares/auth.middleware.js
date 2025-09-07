import verify_token from '../utils/tokenChecker.js'

export const isLoggedIn = async (req, res, next) => {
    const header = req.headers
    const access_token = header['authorization'].split(" ")[1]
    if (!access_token) return res.status(401).json({message: "No token provided"})
    const isTokenValid = verify_token(access_token, "access")
    isTokenValid ? next() : res.status(401).json({message: "Token invalid"})
}

export const isAuthorized = (role) => {
    return  async (req, res, next) => {
        const header = req.headers
        const access_token = header['authorization'].split(" ")[1]
        const token = verify_token(access_token, "access")
        if(!token) return res.status(401).json({message: "Token invalid"})
        const user_role = token.user_role
        if (user_role !== role) return res.status(403).json({message: "Unauthorized to access the resource"})
        next()
    }
}

export const isTheSameUser = (role) => {
    return async (req, res, next) => {
    const id = Number(req.params.id)
    const header = req.headers
    const access_token = header['authorization'].split(" ")[1]
    const token = verify_token(access_token, "access")
    if(!token) return res.status(401).json({message: "Token invalid"})
    const user_id = token.user_id
    const user_role = token.user_role
    if (id === user_id || user_role === role) return next()
    res.status(403).json({message: "Unauthorized to access the resource"})
}
} 
