const movies = require('./movies')


const kok = movies.filter(movie => movie.genre.includes('Crime'))

console.log(kok)
