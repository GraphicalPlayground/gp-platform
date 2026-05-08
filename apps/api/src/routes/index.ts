import { Hono } from 'hono';
import { v1 } from './v1/index.ts';

const router = new Hono();

router.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' }));

router.route('/api/v1', v1);

export { router };
