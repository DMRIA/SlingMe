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
} from "@react-email/components";
import * as React from "react";

interface MarketResearchProps {
    zipCode: string;
    customerEmail: string;
}

export const MarketResearch = ({
    zipCode = "90210",
    customerEmail = "test@example.com",
}: MarketResearchProps) => {
    return (
        <Html>
            <Head />
            <Preview>Out of Area Request: {zipCode}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="my-10 mx-auto p-5 max-w-lg">
                        <Heading className="text-xl font-bold text-gray-800">
                            Market Research Alert
                        </Heading>
                        <Text>
                            A user ({customerEmail}) attempted to book from Zip Code: <strong>{zipCode}</strong>.
                        </Text>
                        <Text>
                            This is outside the current service area (Beaver - Logan).
                            Logged for future expansion analysis.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default MarketResearch;
