import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    phone: v.optional(v.string()),
    name: v.optional(v.string()),
    license_number: v.optional(v.string()),
    license_state: v.optional(v.string()),
    license_expiration: v.optional(v.string()),
    dob: v.optional(v.string()),
    age_verified: v.optional(v.boolean()),
    default_location_id: v.optional(v.id("locations")),
    is_admin: v.optional(v.boolean()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("email", ["email"]),

  locations: defineTable({
    name: v.string(),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zip: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    is_active: v.optional(v.boolean()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("active", ["is_active"]),

  vehicles: defineTable({
    name: v.string(),
    slug: v.optional(v.string()),
    location_id: v.optional(v.id("locations")),
    plate_number: v.optional(v.string()),
    vin: v.optional(v.string()),
    color: v.optional(v.string()),
    seat_count: v.optional(v.number()),
    transmission: v.optional(v.string()),
    photo_urls: v.optional(v.array(v.string())),
    base_hourly_rate: v.optional(v.number()),
    base_daily_rate: v.optional(v.number()),
    status: v.optional(v.string()), // available | booked | in_maintenance | retired
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  })
    .index("location", ["location_id"])
    .index("status", ["status"]),

  availability: defineTable({
    vehicle_id: v.id("vehicles"),
    date: v.string(), // ISO date (YYYY-MM-DD)
    start_time: v.string(), // ISO timestamp
    end_time: v.string(), // ISO timestamp
    type: v.string(), // open | blocked
    reason: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  })
    .index("by_vehicle_date", ["vehicle_id", "date"])
    .index("by_type", ["type"]),

  rentals: defineTable({
    user_id: v.id("users"),
    vehicle_id: v.id("vehicles"),
    location_id: v.optional(v.id("locations")),
    start_time: v.string(),
    end_time: v.string(),
    status: v.string(), // pending | confirmed | in_progress | completed | canceled | no_show
    price_quote_id: v.optional(v.string()),
    final_price: v.optional(v.number()),
    currency: v.optional(v.string()),
    payment_status: v.optional(v.string()), // unpaid | pending | paid | refunded
    payment_provider: v.optional(v.string()), // venmo | stripe | etc.
    waiver_signed: v.optional(v.boolean()),
    waiver_reference: v.optional(v.string()),
    notes_internal: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  })
    .index("by_user", ["user_id"])
    .index("by_vehicle", ["vehicle_id"]),

  pricing_rules: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    vehicle_id: v.optional(v.id("vehicles")),
    location_id: v.optional(v.id("locations")),
    day_of_week: v.optional(v.number()),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    hourly_multiplier: v.optional(v.number()),
    daily_multiplier: v.optional(v.number()),
    min_price: v.optional(v.number()),
    max_price: v.optional(v.number()),
    is_active: v.optional(v.boolean()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  })
    .index("by_vehicle", ["vehicle_id"])
    .index("by_location", ["location_id"]),

  maintenance_events: defineTable({
    vehicle_id: v.id("vehicles"),
    type: v.string(),
    scheduled_at: v.optional(v.string()),
    started_at: v.optional(v.string()),
    completed_at: v.optional(v.string()),
    notes: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.optional(v.number()),
  }).index("by_vehicle", ["vehicle_id"]),

  reviews: defineTable({
    rental_id: v.id("rentals"),
    user_id: v.id("users"),
    vehicle_id: v.id("vehicles"),
    rating: v.number(),
    comment: v.optional(v.string()),
    created_at: v.optional(v.number()),
  })
    .index("by_vehicle", ["vehicle_id"])
    .index("by_user", ["user_id"]),

  agent_runs: defineTable({
    agent_name: v.string(),
    session_id: v.optional(v.string()),
    user_id: v.optional(v.id("users")),
    input_summary: v.optional(v.string()),
    output_summary: v.optional(v.string()),
    status: v.optional(v.string()),
    metadata: v.optional(v.any()),
    created_at: v.optional(v.number()),
  }).index("by_agent", ["agent_name"]),

  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    image_url: v.optional(v.string()),
    author: v.optional(v.string()),
    is_published: v.boolean(),
    published_at: v.optional(v.number()),
    created_at: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["is_published", "published_at"]),
});
