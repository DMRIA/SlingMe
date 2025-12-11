
"use client";

import { format } from "date-fns";
import { Calendar } from "../../components/Calendar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "../../components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendBookingEmails, logMarketResearch } from "../../actions";

export default function BookingPage({ params }: { params: { vehicleId: string } }) {
    const router = useRouter();
    const vehicleId = params.vehicleId as any; // Cast for now to avoid strict Id type issues in build without gen

    // In a real app we'd fetch the specific vehicle. 
    // For now using the list query and finding it, or falling back to stub if not found/id is stub
    const vehicles = useQuery(api.vehicles.list);
    const vehicle = vehicles?.find((v: any) => v._id === vehicleId) || {
        name: "Polaris Slingshot",
        base_daily_rate: 299,
        photo_urls: ["/hero.png"]
    };

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        zip: "",
        days: 1
    });

    // We need to import the server actions. 
    // Since we are in a client component, we pass the data to them.
    // Note: We need to import at top level.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate Zip Code Logic
        const userZip = parseInt(formData.zip);
        // Simple logic: Check if within roughly Logan (84321) and Beaver (84713)
        // This assumes numeric range which is a rough approximation for UT implementation
        const inRange = userZip >= 84321 && userZip <= 84713;

        if (!inRange) {
            alert("You are outside our primary service area (Beaver to Logan). We have logged your request and will contact you if we can make an exception!");
            await logMarketResearch(formData.zip, formData.email);
            return;
        }

        const total = (vehicle.base_daily_rate || 299) * formData.days;

        // Send Emails
        await sendBookingEmails({
            ...formData,
            date: date ? date.toISOString() : new Date().toISOString()
        }, vehicle, total);

        router.push("/success");
    };

    const total = (vehicle.base_daily_rate || 299) * formData.days;

    return (
        <main className="bg-dark-900 min-h-screen pb-24">
            <Header />
            <div className="pt-32 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Vehicle Info */}
                <div>
                    <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
                        <Image
                            src={vehicle.photo_urls?.[0] || "/hero.png"}
                            alt="Vehicle"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">{vehicle.name}</h1>
                    <p className="text-2xl text-primary font-bold mb-6">${vehicle.base_daily_rate || 299}/day</p>

                    <div className="prose prose-invert border-t border-white/10 pt-6">
                        <h3 className="text-white text-lg font-bold mb-4">Availability</h3>
                        <div className="bg-dark-800 rounded-2xl p-4 border border-white/5 inline-block">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={(date) => date < new Date()}
                                className="rounded-md border border-white/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-dark-800 p-8 rounded-3xl border border-white/10 h-fit">
                    <h2 className="text-2xl font-bold text-white mb-6">Complete Booking</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Zip Code</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 84601"
                                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.zip}
                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-dark-900 rounded-xl px-4 py-3 border border-white/10">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Selected Date</label>
                                <p className="text-white font-medium">{date ? format(date, "PPP") : "Select a date"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Duration (Days)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="7"
                                    required
                                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-6">
                            <div className="flex justify-between items-center text-lg font-bold text-white mb-6">
                                <span>Total Due</span>
                                <span>${total}</span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20"
                            >
                                Request to Book
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4">
                                You won&apos;t be charged until the booking is confirmed.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

