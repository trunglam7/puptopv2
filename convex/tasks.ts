import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get contents of db
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Create a new task with the given text
export const createTask = mutation({
  args: { isCompleted: v.boolean(), text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", { isCompleted: args.isCompleted, text: args.text });
    return newTaskId;
  },
});

// delete task with the given id
export const deleteTask = mutation({
  args: { id: v.id("tasks")},
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.delete(args.id);
    return newTaskId;
  },
});

//update task with given id
export const updateTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const { id } = args;

    const completed = await ctx.db.get(id);
  
    // Add `tag` and overwrite `status`:
    await ctx.db.patch(id, {isCompleted: !completed.isCompleted });
  },
});