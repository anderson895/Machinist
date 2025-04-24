import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import PostInquiryForm from "../Partials/PostInquiryForm";
import InquiryComponent from "../Partials/InquiryComponent";
import OrderComponent from "./Partials/OrderComponent";
import { useState } from "react";
import { LuDot } from "react-icons/lu";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function OrderDetails() {
    const user = usePage().props.auth.user;

    const order = usePage().props.order;

    var orderedByUser = order.offer.thread.inquiry.user;

    console.log(order);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: order.id,
        status: order.status ?? "",
        total_amount: order.total_amount ?? "",
        notes: order.notes ?? "",
    });

    useEffect(() => {
        setData({
            id: order.id,
            status: order.status ?? "",
            total_amount: order.total_amount ?? "",
            notes: order.notes ?? "",
        });
    }, [order]);

    const onSaveOrder = (e) => {
        e.preventDefault();

        post("/save-order", {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success("Order saved!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order Details
                </h2>
            }
        >
            <Head title="Orders" />

            <form
                onSubmit={onSaveOrder}
                encType="multipart/form-data"
                className="p-6"
            >
                <div className="pt-4 pb-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-sm p-3">
                        <div className="flex items-center justify-between flex-wrap">
                            <h1 className="text-md font-bold">
                                {orderedByUser.name}
                            </h1>
                            <h3 className="text-sm">
                                {new Date(order.created_at).toLocaleString()}
                            </h3>
                        </div>

                        <div className="flex justify-between flex-wrap">
                            <div className="mt-5">
                                <InputLabel
                                    htmlFor="price"
                                    value="Total Amount"
                                />

                                <TextInput
                                    id="total_amount"
                                    name="total_amount"
                                    className="mt-1 block w-full"
                                    value={data.total_amount}
                                    onChange={(e) =>
                                        setData("total_amount", e.target.value)
                                    }
                                    // required
                                    isFocused
                                    autoComplete="total_amount"
                                    type="number"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.total_amount}
                                />
                            </div>

                            <div className="mt-5">
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    id="status"
                                    name="status"
                                    className=" mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    options={[
                                        // { value: "", label: "" },
                                        { value: "Pending", label: "Pending" },
                                        {
                                            value: "Accepted",
                                            label: "Accepted",
                                        },
                                        {
                                            value: "Preparing",
                                            label: "Preparing",
                                        },
                                        {
                                            value: "Order Ship",
                                            label: "Order Ship",
                                        },
                                        {
                                            value: "Ready To Pick Up",
                                            label: "Ready To Pick Up",
                                        },
                                        {
                                            value: "Delivered",
                                            label: "Delivered",
                                        },
                                        {
                                            value: "Picked Up",
                                            label: "Picked Up",
                                        },
                                    ]}
                                    // required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.status}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-5">
                                <InputLabel htmlFor="notes" value="Notes" />

                                <TextAreaInput
                                    id="notes"
                                    name="notes"
                                    className="mt-1 block w-full"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    // required
                                    isFocused
                                    autoComplete="notes"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.notes}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <PrimaryButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
