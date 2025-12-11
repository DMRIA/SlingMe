export type Article = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  body: string[];
  tags: string[];
};

export const articles: Article[] = [
  {
    slug: "slingshot-rental-safety-checklist",
    title: "Slingshot Rental Safety Checklist: What to Know Before You Ride",
    description:
      "A simple, actionable checklist to prep for your Slingshot rental: documents, weather, gear, and on-the-road tips.",
    updatedAt: "2025-12-10",
    tags: ["safety", "checklist", "rental"],
    body: [
      "Renting a Slingshot is half car, half motorcycle—so preparation matters. Start with documents: bring your driver’s license, confirm age requirements, and review your waiver before pickup. If your state requires a motorcycle endorsement, verify you meet that bar.",
      "Check the weather window. Open-air cabins change the experience: pack layers, sunglasses, and gloves if it will be cold. Avoid loose items and pick secure footwear.",
      "At pickup, walk the vehicle. Note tire tread, lights, turn signals, and any cosmetic scratches. Take timestamped photos. Ask staff about traction control, drive modes, and how to reverse. If you’re carrying a passenger, review handholds and communication cues.",
      "On the road, respect speed changes and give yourself extra following distance. Corners feel different in a three-wheeler—enter smooth, exit smooth. Keep hydration handy and plan stops if you’re doing a scenic loop."
    ]
  },
  {
    slug: "slingshot-rental-pricing-guide",
    title: "Slingshot Rental Pricing Guide: How to Get the Best Rate",
    description:
      "Understand daily vs hourly pricing, demand curves, and discounts to pick the cheapest time to rent a Slingshot.",
    updatedAt: "2025-12-10",
    tags: ["pricing", "guide", "savings"],
    body: [
      "Most Slingshot rentals price by the hour with a cap for daily or multi-day bookings. If your ride spans 6–8 hours, compare the daily rate—it can be cheaper than stacking hourly blocks.",
      "Demand peaks on sunny weekends and holidays. Booking a weekday afternoon or shoulder-season morning often saves 10–25%. Ask about early-bird or multi-day discounts if you are flexible on timing.",
      "Mileage policies vary. Some rentals include a set mileage with per-mile overages. If you are planning a scenic loop, estimate mileage beforehand and pick the package that aligns.",
      "If you see surge-like pricing, aim for off-peak start times. Ask the operator to lock a quote; dynamic pricing can move between inquiry and checkout."
    ]
  },
  {
    slug: "slingshot-routes-and-trip-planning",
    title: "Top Slingshot Routes and Trip Planning Tips",
    description:
      "Three scenic route patterns—coastal, mountain, and city lights—plus how to plan stops for photos and food.",
    updatedAt: "2025-12-10",
    tags: ["routes", "planning", "itineraries"],
    body: [
      "Coastal loops: pick a 2–4 hour window to capture golden hour on the way back. Identify safe pull-outs for photos and avoid high-wind forecasts. Pack layers; ocean air cools quickly after sunset.",
      "Mountain curves: start with fresh tires and avoid peak tourist hours. Map fuel stops and cell coverage gaps. Downshift early to avoid over-braking on long descents.",
      "City lights: choose a loop with skyline views and minimal tolls. Night driving demands clear visors/glasses and extra following distance. Park in well-lit areas and avoid leaving bags in view.",
      "Regardless of route, pre-load offline maps, share your ETA with a friend, and confirm the rental’s roadside assistance details."
    ]
  }
];
