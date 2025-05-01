import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

import { FaPersonCircleQuestion } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";

export default function Dashboard() {
    var props = usePage().props;
    var user = props.auth.user;

    console.log(props);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {user.role === "user" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
                            <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                <div className="font-bold text-md flex items-center mb-3">
                                    Total Inquiries
                                </div>
                                <hr className="border-t-1 border-blue-400" />
                                <div className="font-extrabold mt-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="text-[30px]">
                                            <FaPersonCircleQuestion />
                                        </div>
                                        <div className="text-[50px] text-blue-1000">
                                            {props.inquiriesCount}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                <div className="font-bold text-md flex items-center mb-3">
                                    Total Offers
                                </div>
                                <hr className="border-t-1 border-blue-400" />
                                <div className="font-extrabold mt-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="text-[30px]">
                                            <MdLocalOffer />
                                        </div>
                                        <div className="text-[50px] text-blue-1000">
                                            {props.offersToInquiriesCount}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                <div className="font-bold text-md flex items-center mb-3">
                                    Total Orders
                                </div>
                                <hr className="border-t-1 border-blue-400" />
                                <div className="font-extrabold mt-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="text-[30px]">
                                            <AiOutlineProduct />
                                        </div>
                                        <div className="text-[50px] text-blue-1000">
                                            {props.ordersCount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
