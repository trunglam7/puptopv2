import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUsers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
  });

export const addUser = mutation({
    args: { userId: v.string()},
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").collect();

        if(users.filter(user => user.userId === args.userId).length === 0){
            await ctx.db.insert("users", {
                userId: args.userId,
                dogsVoted: [],
            });
        }
    },
});

export const updateUser = mutation({
    args: {id: v.id("users"), dogId: v.string()},
    handler: async (ctx, args) => {
        const {id, dogId} = args;
        const user = await ctx.db.get(args.id);
        const updatedDogs = user.dogsVoted;
        if(!updatedDogs.includes(dogId)) {
            updatedDogs.push(dogId);
            await ctx.db.patch(id, {dogsVoted: updatedDogs });
        }
    }
})

export const deleteUser = mutation({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field("userId"), args.userId)).collect();
        const dogs = await ctx.db.query("dogs").filter((q) => q.eq(q.field("author"), args.userId)).collect();
        const dogStorageId = dogs.map(dog => dog.imgId);

        await ctx.db.delete(user[0]._id);

        for(let i = 0; i < dogs.length; i++) {
            await ctx.db.delete(dogs[i]._id);
        }
        
        for(let i = 0; i < dogStorageId.length; i++) {
            await ctx.storage.delete(dogStorageId[i]);
        }
    }
})


