import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
config({ path: envFile });

export default defineConfig({
    schema: path.join('src', 'server', 'db', 'schema'),
});
