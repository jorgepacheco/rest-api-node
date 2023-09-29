const ditoJSON = require('./pokemon/ditto.json')

const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Creamos un middleware
// Es una especie de filtro por el que pasaran
// las peticiones que consideremos

app.use((res, req, next) => {
  console.log('middleware fake ...')
  // Si no pongo next se queda colgado en este middelware
  next()
})

// Este middleware hace lo que hemos comentado
app.use(express.json())
/*
app.use((req, res, next) => {
  console.log('middleware extrae body ...')
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  // Solo llegan POST con content json
  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})
*/
app.get('/pokemon/ditto', (req, res) => {
  res.json(ditoJSON)
})

app.post('/pokemon', (req, res) => {
  return res.status(201).json(req.body)
})

// La ultima a la que va a llegar pq no ha mtcheado con nada 

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})


app.listen(PORT, () => {
  console.log(`server listening on port  http://localhost:${PORT}`)
})