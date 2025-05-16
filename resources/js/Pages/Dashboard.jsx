import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

import { FaPersonCircleQuestion } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700 p-3 md:p-0">
                        {(user.role == "user" ||
                            user.role == "manufacturer") && (
                            <>
                                <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <Link
                                        href={route("inquiries", {
                                            filter: "my-inquiry",
                                        })}
                                    >
                                        <div className="font-bold text-md flex items-center mb-3">
                                            My Inquiries
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
                                    </Link>
                                </div>

                                <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <div className="font-bold text-md flex items-center mb-3">
                                        Offers
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
                                    <Link href={route("my-orders")}>
                                        <div className="font-bold text-md flex items-center mb-3">
                                            My Orders
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
                                    </Link>
                                </div>
                            </>
                        )}

                        {user.role == "manufacturer" && (
                            <>
                                <div className="border-l-4 border-pink-400 text-pink-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <Link
                                        href={route("inquiries", {
                                            filter: "offered-inquiries",
                                        })}
                                    >
                                        <div className="font-bold text-md flex items-center mb-3">
                                            Total Offers to Customers
                                        </div>
                                        <hr className="border-t-1 border-pink-400" />
                                        <div className="font-extrabold mt-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="text-[30px]">
                                                    <FaPersonChalkboard />
                                                </div>
                                                <div className="text-[50px] text-pink-1000">
                                                    {
                                                        props.manufacturerOffersCount
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="border-l-4 border-pink-400 text-pink-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <Link href={route("orders")}>
                                        <div className="font-bold text-md flex items-center mb-3">
                                            Total Orders From Customers
                                        </div>
                                        <hr className="border-t-1 border-pink-400" />
                                        <div className="font-extrabold mt-3">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="text-[30px]">
                                                    <FaCartShopping />
                                                </div>
                                                <div className="text-[50px] text-blue-1000">
                                                    {
                                                        props.ordersToManufacturerCount
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}

                        {user.role == "admin" && (
                            <>
                                <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <div className="font-bold text-md flex items-center mb-3">
                                        Total Users
                                    </div>
                                    <hr className="border-t-1 border-blue-400" />
                                    <div className="font-extrabold mt-3">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="text-[30px]">
                                                <FaUsers />
                                            </div>
                                            <div className="text-[50px] text-blue-1000">
                                                {props.totalUsers}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                {props.totalInquiries}
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
                                                {props.totalOffers}
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
                                                {props.totalOrders}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-l-4 border-blue-400 overflow-hidden bg-white shadow-sm rounded-lg p-3">
                                    <div className="font-bold text-md flex items-center mb-3">
                                        Total Completed Orders
                                    </div>
                                    <hr className="border-t-1 border-blue-400" />
                                    <div className="font-extrabold mt-3">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="text-[30px]">
                                                <FaCheckDouble />
                                            </div>
                                            <div className="text-[50px] text-blue-1000">
                                                {props.totalCompletedOrders}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
