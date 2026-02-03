import Fastify from 'fastify'

const app = Fastify({
  logger: true,
})

app.get('/health', async () => {
  return { ok: true }
})

app.listen({ port: 3333 }, () => {
  console.log('🚀 Server running on port 3333')
})
