import { userRoutes } from './modules/user/routes/user-routes.js'
import Fastify from 'fastify'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { resourceRoutes } from '../src/modules/resource/routes/resource-routes.js'
const app = Fastify({
  logger: true,
})

function isPrismaP2002(err: unknown): err is { code: string } {
  return typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'P2002'
}

app.setErrorHandler((error, request, reply) => {
  // ✅ Zod -> 400
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

  // ✅ Regra de negócio (service) -> 409
  if (error instanceof Error && error.message === 'User already exists') {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  // ✅ Prisma unique constraint -> 409
  if (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
  ) {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  // ✅ Fallback mais robusto (caso instanceof falhe)
  if (isPrismaP2002(error)) {
    return reply.status(409).send({
      statusCode: 409,
      error: 'Conflict',
      message: 'Email already exists',
    })
  }

  // ✅ Debug: veja o erro real no terminal
  request.log.error({ error }, 'Unhandled error')

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Unexpected error',
  })
})

app.get('/health', async () => {
  return { ok: true }
})

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running on port 3333')
})


app.register(userRoutes)

app.register(resourceRoutes)