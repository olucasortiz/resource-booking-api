import { userRoutes } from './modules/user/routes/user-routes.js'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import "dotenv/config"
import { Prisma } from '@prisma/client'
import { resourceRoutes } from './modules/resource/routes/resource-routes.js'
import { bookingRoutes } from './modules/booking/routes/booking-routes.js'
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import cors from "@fastify/cors"


const app = Fastify({
  logger: true, 
})

await app.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-api-key"],
})

const API_KEY = process.env.API_KEY

app.addHook("onRequest", async (request, reply) => {
  if (request.method === "OPTIONS") return

  const url = request.raw.url ?? ""
  const isPublic = url.startsWith("/health") || url.startsWith("/docs")
  if (isPublic) return

  const API_KEY = process.env.API_KEY
  if (!API_KEY) return reply.status(500).send({ message: "API_KEY not configured" })

  const key = request.headers["x-api-key"]
  if (key !== API_KEY) return reply.status(401).send({ message: "Unauthorized" })
})

await app.register(swagger, {
  openapi: {
    info: {
      title: "Resource Booking API",
      description: "API for managing reservations of shared resources",
      version: "1.0.0"
    }
  }
})


await app.register(swaggerUI, {
  routePrefix: "/docs"
})


app.register(userRoutes)

app.register(resourceRoutes)

app.register(bookingRoutes)

function isPrismaP2002(err: unknown): err is { code: string } {
  return typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'P2002'
}

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    const issues = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))

    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      issues,
    })
  }

  if (error instanceof Error && error.message === 'User already exists') {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  //  Prisma unique constraint -> 409
  if (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
  ) {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  if (error instanceof Error) {
  if (error.message === 'Booking time conflict') {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Resource is already booked for this time range',
    })
  }

  if (error.message === 'User not found') {
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'User not found',
    })
  }

  if (error.message === 'Resource not found') {
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Resource not found',
    })
  }
}
  if (error instanceof Error && error.message === 'Booking not found') {
    return reply.status(404).send({ statusCode: 404, error: 'Not Found', message: error.message })
  }

  if (error instanceof Error && error.message === 'Booking already canceled') {
    return reply.status(409).send({ statusCode: 409, error: 'Conflict', message: error.message })
  }
  //  Fallback mais robusto (caso instanceof falhe)
  if (isPrismaP2002(error)) {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  request.log.error(error)

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Unexpected error',
  })
})

app.get('/health', async () => {
  return { ok: true }
})





const port = Number(process.env.PORT) || 3333
const host = "0.0.0.0"

const address = await app.listen({ port, host })
app.log.info(`Server listening at ${address}`)
