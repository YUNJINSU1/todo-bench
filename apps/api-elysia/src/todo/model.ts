import { t } from 'elysia';

export namespace TodoModel {
  export const Todo = t.Object({
    id: t.Number(),
    title: t.String(),
    description: t.String(),
    completed: t.Boolean(),
    createdAt: t.String(),
    updatedAt: t.String(),
  });
  export type Todo = typeof Todo.static;

  export const Errors = {
    TODO_NOT_FOUND: 'Todo not found',
    INVALID_ID: 'Invalid id',
    INTERNAL: 'Internal Server Error',
  } as const;

  export const ErrorResponse = t.Object({
    message: t.String(),
  });
  export type ErrorResponse = typeof ErrorResponse.static;

  export const Params = t.Object({
    id: t.Numeric(),
  });
  export type Params = typeof Params.static;

  export const CreateBody = t.Object({
    title: t.String(),
    description: t.String(),
  });
  export type CreateBody = typeof CreateBody.static;

  export const UpdateBody = t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    completed: t.Optional(t.Boolean()),
  });
  export type UpdateBody = typeof UpdateBody.static;
}
