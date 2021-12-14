const http = require('http')
const app = require('./app')

module.exports = async function createServer() {
  const PORT = process.env.PORT || 4000

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Workplus Grocery Store started at PORT: ${PORT}`)
  })
}
