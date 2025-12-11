import Link from "next/link";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-dark-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="text-2xl font-black italic tracking-tighter text-white">
                            SLING<span className="text-primary">ME</span>
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link href="#fleet" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
                                    Our Fleet
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">
                                    Articles
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center">
                        <Link
                            href="#fleet"
                            className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-3 px-6 rounded-full transition-transform transform hover:-translate-y-0.5 shadow-lg shadow-primary/25"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
