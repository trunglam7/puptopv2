import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// add a new dog
export const addDog = mutation({
    args: { isCompleted: v.boolean(), text: v.string() },
    handler: async (ctx, args) => {
      const newTaskId = await ctx.db.insert("tasks", { isCompleted: args.isCompleted, text: args.text });
      return newTaskId;
    },
});

//update dog with given id
export const updateScore = mutation({
  args: { id: v.id("dogs"), score: v.number() },
  handler: async (ctx, args) => {
    const { id, score } = args;
  
    await ctx.db.patch(id, {score: score });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const submitDog = mutation({
  args: { storageId: v.string(), author: v.string(), name: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert("dogs", {
      imgId: args.storageId,
      author: args.author,
      name: args.name,
      score: 0
    });
  },
});


export const getDogs = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("dogs").collect();
    return Promise.all(
      messages.map(async (dog) => ({
        ...dog,
        // If the message is an "image" its `body` is a `StorageId`
        ...(dog.imgId
          ? { url: await ctx.storage.getUrl(dog.imgId) }
          : {}),
      }))
    );
  },
});
