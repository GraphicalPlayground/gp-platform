import { Hono } from 'hono';
import { auth } from './auth.ts';
import { coursesRouter } from './courses.ts';
import { usersRouter } from './users.ts';

const v1 = new Hono();

v1.route('/auth', auth);
v1.route('/courses', coursesRouter);
v1.route('/users', usersRouter);

export { v1 };
