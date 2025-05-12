import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-white text-gray-800 min-h-screen">
                <nav className="flex justify-between items-center px-8 py-6 shadow-sm border-b border-gray-200">
                    <ApplicationLogo className="h-12 w-auto drop-shadow-md" />
                    <div className="text-2xl font-bold text-gray-900"></div>
                    <div className="space-x-6">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="hover:text-gray-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="hover:text-gray-600  "
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="hover:text-gray-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                <section
                    className="px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10"
                    style={{

                        // backgroundImage: "url('images/welcome-bg.jpg')",
                        backgroundImage: "url('images/welcome-bg-2.webp')",

                       

                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                    <div className="max-w-xl bg-gray-400/50 p-6 rounded-xl">
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white"
                            style={{
                                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                            }}

                  

                        >
                            Connecting{" "}
                            <span
                                className="text-blue-300"

                                style={{
                                    textShadow: "2px 2px 1px white",
                                }}

                                

                            >
                                clients
                            </span>{" "}
                            and{" "}
                            <span
                                className="text-blue-300"

                                style={{
                                    textShadow: "2px 2px 1px white",
                                }}

                                

                            >
                                manufacturers
                            </span>{" "}
                            in one platform
                        </h1>
                        <p
                            className="text-lg mb-8 text-white"
                            style={{ textShadow: "1px 1px 1px black" }}
                        >
                            We make it easier and faster to find the right
                            business partner—whether you're a manufacturer or a
                            client.
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href={route("register")}

                                className="border border-white bg-blue-300/75 text-white px-6 py-3 rounded-xl font-black hover:bg-gray-900 transition"

                            >
                                Get Started
                            </Link>

                            <a
                                href="#learnMore"

                                className="border border-white text-white font-medium px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"

                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>

                {/* Feature Section */}
                <section id="learnMore" className="bg-gray-50 py-20 px-8">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">
                            Why Choose Machinist?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-10 mt-10 text-left">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    Grow Together
                                </h3>
                                <p className="text-gray-600">
                                    Whether you're a manufacturer or a client,
                                    Machinist helps you find the right partner
                                    to grow your business with confidence.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    Built on Trust
                                </h3>
                                <p className="text-gray-600">
                                    We make connection simple, transparent, and
                                    reliable—so you can focus on what matters
                                    most: quality and results.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    Opportunities Made Easy
                                </h3>
                                <p className="text-gray-600">
                                    Find clients. Discover manufacturers. With
                                    Machinist, the right opportunity is always
                                    within reach.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-8 border-t border-gray-200 mt-10 text-sm text-gray-500">
                    © {new Date().getFullYear()} Machinist
                </footer>
            </div>
        </>
    );
}
