
const http = require('node:http')

const json = require('./pokemon/ditto.json')

const desiredPort = process.env.PORT ?? 1234

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const processRequest = (req, res) => {

  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(json))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          let body = ''
          // escuchar el evento data (llega a trozos el body (chunk))
          req.on('data', chunk => {
            body += chunk
          })
          // Cuando acaba de llegar el data
          req.on('end', () => {
            const data = JSON.parse(body)
            /// Procesamiento de los datos
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }

  }

}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port  http://localhost:${desiredPort}`)
})
