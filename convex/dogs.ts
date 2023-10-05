import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get contents of db
export const getDogs = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("dogs").collect();
    },
});

// add a new dog
export const addDog = mutation({
    args: { isCompleted: v.boolean(), text: v.string() },
    handler: async (ctx, args) => {
      const newTaskId = await ctx.db.insert("tasks", { isCompleted: args.isCompleted, text: args.text });
      return newTaskId;
    },
});