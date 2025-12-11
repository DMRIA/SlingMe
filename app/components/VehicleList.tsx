"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";

export function VehicleList() {
    const vehicles = useQuery(api.vehicles.list);

    // Fallback for visual testing if no vehicles in DB yet
    const displayVehicles = vehicles && vehicles.length > 0 ? vehicles : [
        {
            _id: "stub_1",
            name: "Polaris Slingshot SL (Red)",
            photo_urls: ["/hero.png"], // Reuse hero for now
            transmission: "Manual",
            seat_count: 2,
            base_daily_rate: 299,
        },
        {
            _id: "stub_2",
            name: "Polaris Slingshot R (Black)",
            photo_urls: ["/hero.png"],
            transmission: "Auto",
            seat_count: 2,
            base_daily_rate: 349,
        }
    ];

    return (
        <section id="fleet" className="py-24 bg-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Choose Your Ride</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayVehicles.map((vehicle: any) => (
                        <div key={vehicle._id} className="group bg-dark-900 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={vehicle.photo_urls?.[0] || "/hero.png"}
                                    alt={vehicle.name}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Available
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
                                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                                    <span className="flex items-center gap-1">
                                        ⚙️ {vehicle.transmission || 'Manual'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        👥 {vehicle.seat_count || 2} Seats
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-3xl font-bold text-white">${vehicle.base_daily_rate}</span>
                                        <span className="text-gray-400 text-sm">/day</span>
                                    </div>

                                    {/* Only link real IDs if not stubs, otherwise stub behavior */}
                                    <Link
                                        href={`/book/${vehicle._id}`}
                                        className="bg-white text-dark-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-colors"
                                    >
                                        Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
