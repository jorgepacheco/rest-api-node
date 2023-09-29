const fs = require('node:fs')
const http = require('node:http')

const desiredPort = process.env.PORT ?? 1234

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function processRequest(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.statusCode = 200
  if (req.url === '/') {
    res.end('Bienvenido a la página de inicio..')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./imagen1.png', (error, data) => {
      if (error) {
        res.statusCode = 500
        res.end('<h1>500 Internal error </h1>')
      } else {
        res.setHeader('Content-Type', 'img/png')
        res.end(data)
      }
    })

  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port  http://localhost:${desiredPort}`)
})
