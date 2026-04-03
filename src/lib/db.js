import { neon } from '@neondatabase/serverless';

// Uses the stateless HTTP connection for Neon, perfectly compatible with Vercel Serverless
const sql = neon(process.env.DATABASE_URL);

export default sql;
