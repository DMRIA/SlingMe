import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("vehicles").filter((q) => q.eq(q.field("status"), "available")).collect();
    },
});

export const get = query({
    args: { id: v.id("vehicles") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});
