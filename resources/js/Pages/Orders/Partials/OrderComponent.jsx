import { Link } from "@inertiajs/react";

import { FaArrowRight } from "react-icons/fa";

import { LuDot } from "react-icons/lu";

export default function OrderComponent({ order }) {
    var orderedByUser = order.offer.thread.inquiry.user;

    console.log(orderedByUser);

    return (
        <>
            <Link href={route("order-details", { id: order.id })}>
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-sm p-3 mt-1 cursor-pointer">
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="text-md font-bold">
                            <span>{orderedByUser.name}</span>
                        </div>
                        <div className="text-sm flex items-center">
                            <div>
                                {new Date(order.created_at).toLocaleString()}
                            </div>
                            <div className="text-xl">
                                <LuDot />
                            </div>
                            <div className="text-green-600 flex items-center">
                                <span>{order.status.toUpperCase()} </span>
                                <span className="text-lg ml-1">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <div>View Thread{order.offer.thread_id}</div> */}
                </div>
            </Link>
        </>
    );
}
