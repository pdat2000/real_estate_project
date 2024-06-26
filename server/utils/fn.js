const { networkInterfaces } = require('os')

const getIpAddress = () => {
  const nets = networkInterfaces()
  const results = Object.create(null)

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
      }
    }
  }

  return Object.values(results)[0]
}

const gerenateKeyRedis = (filter) => {
  const filterStringKey = JSON.stringify(filter)
    .replace(/\W/g, '')
    .split('')
    .sort((a, b) => a.localeCompare(b))
    .join('')
  const IPAddress = getIpAddress()

  return filterStringKey + IPAddress
}

module.exports = {
  gerenateKeyRedis,
}
