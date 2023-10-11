import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
    const dogs = await ctx.db.query("dogs").collect();
    return Promise.all(
      dogs.map(async (dog) => ({
        ...dog,
        ...(dog.imgId
          ? { url: await ctx.storage.getUrl(dog.imgId) }
          : {}),
      }))
    );
  },
});

export const deleteDog = mutation({
  args: {id: v.id("dogs")},
  handler: async (ctx, args) => {
    const dog = await ctx.db.get(args.id);
    const imageId = dog.imgId;

    await ctx.db.delete(args.id);
    await ctx.storage.delete(imageId);
  }
})

/* Demo Functions */
export const getDogsDemo = query({
  args: {},
  handler: async (ctx) => {
    const dogs = await ctx.db.query("dogs_demo").collect();
    return Promise.all(
      dogs.map(async (dog) => ({
        ...dog,
        ...(dog.imgId
          ? { url: await ctx.storage.getUrl(dog.imgId) }
          : {}),
      }))
    );
  },
});

export const submitDogDemo = mutation({
  args: { storageId: v.string(), author: v.string(), name: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert("dogs_demo", {
      imgId: args.storageId,
      author: args.author,
      name: args.name,
      score: 0
    });
  },
});

export const updateScoreDemo = mutation({
  args: { id: v.id("dogs_demo"), score: v.number() },
  handler: async (ctx, args) => {
    const { id, score } = args;
  
    await ctx.db.patch(id, {score: score });
  },
});

export const deleteDogDemo = mutation({
  args: {id: v.id("dogs_demo")},
  handler: async (ctx, args) => {
    const dog = await ctx.db.get(args.id);
    const imageId = dog.imgId;

    await ctx.db.delete(args.id);
    await ctx.storage.delete(imageId);
  }
})