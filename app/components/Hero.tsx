import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-dark-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.png"
                    alt="Red Polaris Slingshot at night"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-widest uppercase mb-8 shadow-sm">
                    Drive the <span className="font-light">Experience</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-12 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
                    Premium Slingshot rentals for the discerning driver.
                    Performance, style, and freedom.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        href="#fleet"
                        className="bg-white text-dark-900 border border-white hover:bg-gray-100 text-sm md:text-base font-semibold py-4 px-12 uppercase tracking-widest transition-all"
                    >
                        View Fleet
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="bg-transparent hover:bg-white/10 text-white border border-white text-sm md:text-base font-semibold py-4 px-12 uppercase tracking-widest transition-all"
                    >
                        How it Works
                    </Link>
                </div>
            </div>
        </div>
    );
}
