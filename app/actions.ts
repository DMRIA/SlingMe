"use server";

import { Resend } from "resend";
import { render } from "@react-email/components";
import UserConfirmation from "./emails/UserConfirmation";
import AdminNotification from "./emails/AdminNotification";
import MarketResearch from "./emails/MarketResearch";
import * as ics from "ics";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123_mock_key");

export async function sendBookingEmails(formData: any, vehicle: any, total: number) {
    const { name, email, date, days, zip } = formData;
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);

    // 1. Generate ICS
    const event: ics.EventAttributes = {
        start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), 9, 0],
        duration: { days: days },
        title: `SlingMe Rental: ${vehicle.name}`,
        description: `Pickup your ${vehicle.name}. Access Key: #SLING-${startDate.getTime()}`,
        location: "SlingMe HQ, Northern Provo",
        status: "CONFIRMED",
        busyStatus: "BUSY",
        organizer: { name: "Doorman Ria", email: "doormanria@gmail.com" },
        attendees: [{ name: name, email: email }]
    };

    const { value: iCalString } = ics.createEvent(event);

    // Mock Mode Check
    if (!process.env.RESEND_API_KEY) {
        console.log("=== [MOCK EMAIL] RESEND_API_KEY missing ===");
        console.log(`To: ${email}`);
        console.log(`Subject: Booking Confirmation`);
        console.log(`ICS Generated: ${!!iCalString}`);
        console.log("===========================================");
        return { success: true, mocked: true };
    }

    try {
        // 2. User UserConfirmation
        await resend.emails.send({
            from: "SlingMe <bookings@slingme.com>", // Validated domain required, or use 'onboarding@resend.dev' for test
            to: email,
            subject: "Action Required: Confirm your SlingMe Rental",
            react: UserConfirmation({
                customerName: name,
                vehicleName: vehicle.name,
                startDate: date,
                durationDays: days,
                totalPrice: total
            }),
            attachments: iCalString ? [{ filename: "rental.ics", content: iCalString }] : []
        });

        // 3. Admin Notification
        await resend.emails.send({
            from: "SlingMe System <system@slingme.com>",
            to: "doormanria@gmail.com",
            subject: `New Request: ${name} ($${total})`,
            react: AdminNotification({
                customerName: name,
                customerEmail: email,
                vehicleName: vehicle.name,
                startDate: date,
                durationDays: days,
                totalPrice: total,
                zipCode: zip
            })
        });

        return { success: true };
    } catch (error) {
        console.error("Email send failed:", error);
        return { success: false, error };
    }
}

export async function logMarketResearch(zip: string, email: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log(`[MOCK RESEARCH] Out of area: ${zip} by ${email}`);
        return;
    }

    try {
        await resend.emails.send({
            from: "SlingMe Market <market@slingme.com>",
            to: "doormanria@gmail.com",
            subject: `Market Research: Out of Area Request (${zip})`,
            react: MarketResearch({ zipCode: zip, customerEmail: email })
        });
    } catch (e) {
        console.error("Market research log failed", e);
    }
}
