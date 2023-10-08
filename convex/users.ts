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


