import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { todo } from './todo';

const app = new Elysia()
  .use(
    openapi({
      path: '/docs',
    }),
  )
  .use(todo)
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
