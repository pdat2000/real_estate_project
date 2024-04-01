const redis = require("redis")

const client = redis.createClient({
  url: process.env.REDIS_URL,
})

client.on("error", (err) => console.log("Connect redis error: ", err))

const connectionRedis = async () => {
  await client.connect()
  console.log("Redis connected")
}

connectionRedis()

module.exports = client
