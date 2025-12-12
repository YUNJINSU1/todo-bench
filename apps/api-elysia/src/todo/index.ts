// Controller handle HTTP related eg. routing, request validation
import { Elysia, t } from 'elysia';
import { TodoModel } from './model';
import { TodoService } from './service';

export const todo = new Elysia({ prefix: '/todo' })
  .get('/', () => TodoService.getAll(), {
    response: t.Array(TodoModel.Todo),
  })
  .get('/:id', ({ params: { id } }) => TodoService.get(id), {
    params: TodoModel.Params,
    response: TodoModel.Todo,
  })
  .post('/', ({ body }) => TodoService.create(body), {
    body: TodoModel.CreateBody,
    response: TodoModel.Todo,
  })
  .patch('/:id', ({ params: { id }, body }) => TodoService.update(id, body), {
    params: TodoModel.Params,
    body: TodoModel.UpdateBody,
    response: TodoModel.Todo,
  })
  .delete('/:id', ({ params: { id } }) => TodoService.delete(id), {
    params: TodoModel.Params,
    response: t.Object({
      success: t.Boolean(),
    }),
  });
