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
            <div className="bg-gray-50 text-black/90 dark:bg-black dark:text-white/90 min-h-screen">
    {/* Navbar */}
    <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MyApp</div>
        <div className="space-x-6">
            {auth.user ? (
                <Link href={route('dashboard')} className="hover:text-indigo-500">Login</Link>
            ) : (
                <>
                <Link href={route('login')} className="hover:text-indigo-500">Login</Link>
                <Link href={route('register')} className="hover:text-indigo-500">Register</Link>
                </>
            )}
        </div>
    </nav>

    {/* Hero Section */}
    <section className="px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                Build better websites with <span className="text-indigo-600 dark:text-indigo-400">Tailwind</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
                A utility-first CSS framework for rapidly building modern websites. Clean, fast, and customizable.
            </p>
            <div className="flex gap-4">
                <Link
                    href="#"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
                >
                    Get Started
                </Link>
                <Link
                    href="#"
                    className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <img
            src="/images/hero-placeholder.svg"
            onError={handleImageError}
            className="max-w-md drop-shadow-lg dark:brightness-90"
            alt="Hero Illustration"
        />
    </section>

    {/* Feature Section */}
    <section className="bg-white dark:bg-gray-900 py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Choose Tailwind?</h2>
            <div className="grid md:grid-cols-3 gap-10 mt-10">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Fast Development</h3>
                    <p className="text-gray-600 dark:text-gray-400">Rapidly build modern websites without ever leaving your HTML.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Fully Customizable</h3>
                    <p className="text-gray-600 dark:text-gray-400">Tailwind is designed to be component-friendly and infinitely extendable.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Responsive by Default</h3>
                    <p className="text-gray-600 dark:text-gray-400">Tailwind’s responsive modifiers make designing for all screen sizes effortless.</p>
                </div>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="text-center py-8 border-t dark:border-gray-800 mt-10 text-sm">
        © {new Date().getFullYear()} MyApp. Built with ❤️ and Tailwind.
    </footer>
</div>

        </>
    );
}
