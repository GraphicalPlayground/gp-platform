import { cors } from 'hono/cors';
import { env } from '../config/env.ts';

export const corsMiddleware = cors({
  origin: (origin) => {
    const allowedOrigins = env.CORS_ORIGINS.split(',').map((o) => o.trim());
    
    // In development, allow localhost on common ports
    if (env.NODE_ENV === 'development') {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return origin;
      }
    }

    if (allowedOrigins.includes(origin)) {
      return origin;
    }
    
    return allowedOrigins[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['X-Total-Count'],
  credentials: true,
  maxAge: 86400
});
