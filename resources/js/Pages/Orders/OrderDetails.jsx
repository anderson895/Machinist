import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "../Partials/PostInquiryForm";
import InquiryComponent from "../Partials/InquiryComponent";
import OrderComponent from "./Partials/OrderComponent";
import { useState } from "react";

export default function OrderDetails() {
    const user = usePage().props.auth.user;

    const order = usePage().props.order;

    console.log(order);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order Details
                </h2>
            }
        >
            <Head title="Orders" />

            <div className="pt-4 pb-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                Order Details
            </div>
        </AuthenticatedLayout>
    );
}
