import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { Bson, ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

// let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  const dbTodos = await getDb().collection("todos").find().toArray();
  const transformedTodos = dbTodos.map((todo) => ({
    id: todo._id.toString(),
    text: todo.text,
  }));
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: data.text,
  };

  const id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body().value;
  // console.log(tid);
  await getDb().collection("todos")
    .updateOne({ _id: new Bson.ObjectId(tid) }, { $set: { text: data.text } });

  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb().collection("todos").deleteOne({ _id: new Bson.ObjectId(tid) });

  ctx.response.body = { message: "Deleted todo" };
});

export default router;
