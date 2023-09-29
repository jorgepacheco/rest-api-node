const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title should be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

// Con partial lo deja todo opcional, si esta el campo se valida y sino pasa
function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}