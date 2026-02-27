import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().pipe(z.url()),
})

export const parseEnv = envSchema.safeParse(process.env)

if (!parseEnv.success) {
  console.error('Invalid environment variables', z.treeifyError(parseEnv.error))
  throw new Error('Invalid environment variables')
}

export const env = parseEnv.data
