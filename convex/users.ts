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
    args: {id: v.id("users"), currDog: v.number()},
    handler: async (ctx, args) => {
        const {id, currDog} = args;
        await ctx.db.patch(id, {currDog: currDog});
        
    }
})


