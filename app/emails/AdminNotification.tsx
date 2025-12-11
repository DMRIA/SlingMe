import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationProps {
    customerName: string;
    customerEmail: string;
    vehicleName: string;
    startDate: string;
    durationDays: number;
    totalPrice: number;
    zipCode: string;
}

export const AdminNotification = ({
    customerName = "Doorman Ria",
    customerEmail = "doormanria@gmail.com",
    vehicleName = "Polaris Slingshot R",
    startDate = "2025-07-04",
    durationDays = 2,
    totalPrice = 598,
    zipCode = "84601",
}: AdminNotificationProps) => {
    return (
        <Html>
            <Head />
            <Preview>New Booking Request: ${totalPrice}</Preview>
            <Tailwind>
                <Body className="bg-black text-white font-sans">
                    <Container className="border border-gray-800 rounded my-10 mx-auto p-5 max-w-lg bg-[#111111]">
                        <Heading className="text-white text-2xl font-bold text-center mb-8">
                            New <span className="text-red-700">SlingMe</span> Request
                        </Heading>

                        <Section className="bg-[#1A1A1A] rounded-lg p-6 border border-gray-800">
                            <Row className="mb-4 border-b border-gray-700 pb-2">
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Customer</Column>
                                <Column className="font-bold text-white">{customerName}</Column>
                            </Row>
                            <Row className="mb-4 border-b border-gray-700 pb-2">
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Email</Column>
                                <Column className="text-white">{customerEmail}</Column>
                            </Row>
                            <Row className="mb-4 border-b border-gray-700 pb-2">
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Vehicle</Column>
                                <Column className="text-red-500 font-bold">{vehicleName}</Column>
                            </Row>
                            <Row className="mb-4 border-b border-gray-700 pb-2">
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Date</Column>
                                <Column className="text-white">{startDate} ({durationDays} days)</Column>
                            </Row>
                            <Row className="mb-4 border-b border-gray-700 pb-2">
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Zip</Column>
                                <Column className="text-white">{zipCode}</Column>
                            </Row>
                            <Row>
                                <Column className="w-1/3 text-gray-400 text-sm uppercase tracking-wider">Est. Revenue</Column>
                                <Column className="text-2xl font-bold text-green-500">${totalPrice}</Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default AdminNotification;
