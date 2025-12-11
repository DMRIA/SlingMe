import { query } from "../_generated/server";
import { v } from "convex/values";

// Stub query to validate Convex wiring; replace with real availability logic.
export const getAvailability = query({
  args: {
    vehicle_id: v.optional(v.id("vehicles")),
    date_range: v.optional(v.object({ start: v.string(), end: v.string() }))
  },
  handler: async (ctx, args) => {
    let results;
    if (args.vehicle_id) {
      results = await ctx.db
        .query("availability")
        .withIndex("by_vehicle_date", (q) =>
          q.eq("vehicle_id", args.vehicle_id!)
        )
        .collect();
    } else {
      results = await ctx.db.query("availability").collect();
    }

    if (args.date_range) {
      const { start, end } = args.date_range;
      results = results.filter((r) => r.date >= start && r.date <= end);
    }

    return results;
  }
});
