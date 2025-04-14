import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-white text-gray-800 min-h-screen">

                {/* Header Banner */}
                <div className="w-full flex items-center h-16 bg-gray-100 overflow-hidden">
    {/* Logo on the left */}
    <div className="w-full relative h-16 overflow-hidden">
    {/* Banner Image (Background) */}
    <img 
        src="/images/header-banner.png" 
        alt="Welcome to Machinist Banner" 
        className="w-full h-full object-cover"
    />

    {/* Logo (Overlayed on top) */}
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <img
            src="/images/machinist-logo.png"
            onError={handleImageError}
            className="h-12 w-auto drop-shadow-md"
            alt="Machinist Logo"
        />
    </div>
</div>

</div>


                {/* Navbar */}
                <nav className="flex justify-between items-center px-8 py-6 shadow-sm border-b border-gray-200">
                    <div className="text-2xl font-bold text-gray-900"></div>
                    <div className="space-x-6">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="hover:text-gray-600">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hover:text-gray-600">Login</Link>
                                <Link href={route('register')} className="hover:text-gray-600">Register</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
                            Build better websites with <span className="text-gray-500">Tailwind</span>
                        </h1>
                        <p className="text-lg mb-8 text-gray-600">
                            A utility-first CSS framework for rapidly building modern websites. Clean, fast, and customizable.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="#"
                                className="border border-gray-300 text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <img
                        src="/images/machinist-logo.png"
                        onError={handleImageError}
                        className="max-w-md drop-shadow-sm"
                        alt="Hero Illustration"
                    />
                </section>

                {/* Feature Section */}
                <section className="bg-gray-50 py-20 px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Tailwind?</h2>
                        <div className="grid md:grid-cols-3 gap-10 mt-10 text-left">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Development</h3>
                                <p className="text-gray-600">Rapidly build modern websites without ever leaving your HTML.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Fully Customizable</h3>
                                <p className="text-gray-600">Tailwind is designed to be component-friendly and infinitely extendable.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">Responsive by Default</h3>
                                <p className="text-gray-600">Tailwind’s responsive modifiers make designing for all screen sizes effortless.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-8 border-t border-gray-200 mt-10 text-sm text-gray-500">
                    © {new Date().getFullYear()} Machinist. Built with ❤️ and Tailwind.
                </footer>
            </div>
        </>
    );
}
