import { sql } from 'bun';
import { status } from 'elysia';
import { TodoModel } from './model';
export abstract class TodoService {
  static async create({ title, description }: TodoModel.CreateBody) {
    const [todo] = await sql`
			INSERT INTO todos (title, description)
			VALUES (${title}, ${description})
			RETURNING *`;

    if (!todo) throw status(500, TodoModel.Errors.INTERNAL);

    return {
      id: Number(todo.id),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    } satisfies TodoModel.Todo;
  }
  static async getAll() {
    const todos = await sql`
            SELECT * FROM todos ORDER BY "createdAt" DESC`;

    return todos.map((todo: any) => ({
      id: Number(todo.id),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    })) satisfies TodoModel.Todo[];
  }
  static async get(id: number) {
    const [todo] = await sql`
			SELECT * FROM todos WHERE id = ${id}`;

    if (!todo) throw status(404, TodoModel.Errors.TODO_NOT_FOUND);

    return {
      id: Number(todo.id),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    } satisfies TodoModel.Todo;
  }
  static async delete(id: number) {
    const [todo] = await sql`
			DELETE FROM todos WHERE id = ${id} RETURNING id`;

    if (!todo) throw status(404, TodoModel.Errors.TODO_NOT_FOUND);

    return {
      success: true,
    };
  }
  static async update(id: number, update: TodoModel.UpdateBody) {
    const { title, description, completed } = update;

    const [todo] = await sql`
			UPDATE todos
			SET 
                title = COALESCE(${title ?? null}, title), 
                description = COALESCE(${description ?? null}, description),
                completed = COALESCE(${completed ?? null}, completed),
                "updatedAt" = NOW()
			WHERE id = ${id}
			RETURNING *`;

    if (!todo) throw status(404, TodoModel.Errors.TODO_NOT_FOUND);

    return {
      id: Number(todo.id),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    } satisfies TodoModel.Todo;
  }
}
