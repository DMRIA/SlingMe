import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface UserConfirmationProps {
    customerName?: string;
    vehicleName?: string;
    startDate?: string;
    durationDays?: number;
    totalPrice?: number;
    confirmationLink?: string;
}

export const UserConfirmation = ({
    customerName = "Valued Customer",
    vehicleName = "Polaris Slingshot SL",
    startDate = "tomorrow",
    durationDays = 1,
    totalPrice = 299,
    confirmationLink = "http://localhost:3000/confirm",
}: UserConfirmationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Confirm your SlingMe booking request</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#B91C1C",
                                dark: "#111111",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Booking Received!
                            </Heading>
                            <Text className="text-black text-[14px] leading-[24px]">
                                Hello {customerName},
                            </Text>
                            <Text className="text-black text-[14px] leading-[24px]">
                                We received your request to rent the <strong>{vehicleName}</strong> starting on {startDate} for {durationDays} day(s).
                            </Text>
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button
                                    className="bg-[#B91C1C] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                    href={confirmationLink}
                                >
                                    Confirm Booking (${totalPrice})
                                </Button>
                            </Section>
                            <Text className="text-black text-[14px] leading-[24px]">
                                Please click the button above to verify your email and finalize your request.
                                Our team will review availability and send you the Venmo payment details shortly.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default UserConfirmation;
