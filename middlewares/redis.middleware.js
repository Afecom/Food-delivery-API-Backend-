import redis from "../configs/redis.config.js";

const redis_middleware = async (req, res, next) => {
    if(req.method.toLowerCase() !== "get") return next()
    const cache_key = `cache_${req.originalUrl}`

    try {
        const cached_data = await redis.get(cache_key)
        const parsed_data = JSON.parse(cached_data)
        if(cached_data) return res.status(200).json({message: "Data fetced successfully", parsed_data})
        const originalJson = res.json.bind(res)
        res.json = (body) => {
            redis.setex(cache_key, 60, JSON.stringify(body))
            console.log("data cached successfully")
            return originalJson(body)
        }
        next()
    } catch (error) {
        console.log("an error occured while interacting with redis or the response", error)
        next()
    }
}

export default redis_middleware