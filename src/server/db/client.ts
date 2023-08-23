import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server.mjs';

//set up Prisma client for interacting with a database
declare global {
  var prisma: PrismaClient | undefined;
}


//exports a constant prisma that represents the client instance
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
