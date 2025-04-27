import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import SelectInput from "@/Components/SelectInput";

import { Head, usePage } from "@inertiajs/react";

import OrderComponent from "./Partials/OrderComponent";

import { useState } from "react";

export default function MyOrders() {
    const user = usePage().props.auth.user;

    const orders = usePage().props.orders;

    console.log(orders);

    const [filter, setFilter] = useState("all");

    const filteredOrders = orders.filter((order) => {
        if (filter == "all") {
            return true;
        }

        return order.status == filter;
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Orders
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="pt-4 pb-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4 flex justify-end">
                <div className="w-full md:w-[25%]">
                    {/* <SelectInput
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        options={[
                            { value: "all", label: "All" },
                            {
                                value: "Pending",
                                label: "Pending",
                            },
                            {
                                value: "Delivered",
                                label: "Delivered",
                            },
                        ]}
                    /> */}
                </div>
            </div>

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {filteredOrders.map((order) => (
                        <OrderComponent
                            key={`order-${order.id}`}
                            order={order}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
