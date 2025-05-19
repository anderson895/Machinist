import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import FileInput from "@/Components/FileInput";
import ProofOfPaymentUpload from "./Partials/ProofOfPaymentUpload";
import ProofOfDeliveryUpload from "./Partials/ProofOfDeliveryUpload";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, usePage, useForm, Link } from "@inertiajs/react";

import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import NavLink from "@/Components/NavLink";

export default function OrderDetails() {
    const user = usePage().props.auth.user;

    const order = usePage().props.order;

    const offer = order.offer;

    var orderedByUser = order.offer.thread.inquiry.user;

    console.log(order);

    console.log("offered by: " + offer.thread.user_id);
    console.log("ordered by: " + orderedByUser.id);

    const isManufacturer = user.id === offer.thread.user_id;

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

        if (data.total_amount < 1 || notes == "") {
            toast.error(
                "Please input the total amount and add notes for customer."
            );

            return;
        }

        // if (data.status == "Ready To Pick Up" || data.status == "Order Ship") {
        //     // need to upload item_image
        // }

        if (
            (data.status === "Picked Up" || data.status === "Delivered") &&
            !order.proof_of_delivery
        ) {
            const proofMessage =
                data.status === "Picked Up"
                    ? "Please upload proof of pick up"
                    : "Please upload proof of delivery";
            toast.error(proofMessage);

            return;
        }

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

    const groupFilesByLabel = (files) => {
        return files.reduce((acc, file) => {
            if (!acc[file.label]) {
                acc[file.label] = [];
            }
            acc[file.label].push(file);
            return acc;
        }, {});
    };

    // Status
    const mod = offer.mod;
    const mop = offer.mop;

    const statusWorkflow = {
        "Pick Up": {
            "Online Payment": [
                "Pending",
                ...(offer.net_days > 0 ? [] : ["Waiting for Payment"]),
                "Accepted",
                "Preparing",
                "Ready To Pick Up",
                "Picked Up",
                "Rejected",
            ],
            COP: [
                "Pending",
                "Accepted",
                "Preparing",
                "Ready To Pick Up",
                "Picked Up",
                "Rejected",
            ],
        },
        Deliver: {
            "Online Payment": [
                "Pending",
                ...(offer.net_days > 0 ? [] : ["Waiting for Payment"]),
                "Accepted",
                "Preparing",
                "Order Ship",
                "Delivered",
                "Rejected",
            ],
            COD: [
                "Pending",
                "Accepted",
                "Preparing",
                "Order Ship",
                "Delivered",
                "Rejected",
            ],
        },
    };

    // Net 15
    // Net 30
    // Net 45
    // Net 60
    // Net 90

    const getStatusOptions = () => {
        console.log(data.status);
        const workflow = statusWorkflow[mod][mop];
        const currentIndex = workflow.indexOf(data.status);
        const acceptedIndex = workflow.indexOf("Accepted");

        if (data.status === "Rejected") {
            return [{ value: "Rejected", label: "Rejected" }];
        }

        return workflow
            .filter((status, index) => {
                // Always include current status
                if (status === data.status) return true;

                if (status === "Waiting for Payment") {
                    return (
                        data.status === "Pending" && mop === "Online Payment"
                    );
                }

                if (status === "Rejected") {
                    return currentIndex < acceptedIndex;
                }

                return index === currentIndex + 1;
            })
            .map((status) => ({ value: status, label: status }));
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

            <div className="pt-5 pb-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4 flex gap-3">
                {(order.status == "Waiting for Payment" ||
                    order.status == "Picked Up" ||
                    order.status == "Delivered") &&
                    order.proof_of_payment == null &&
                    user.id == orderedByUser.id && (
                        <ProofOfPaymentUpload order_id={order.id} />
                    )}

                {(order.status == "Order Ship" ||
                    order.status == "Ready To Pick Up") &&
                    order.proof_of_delivery == null &&
                    user.id == offer.thread.user_id && (
                        <ProofOfDeliveryUpload order_id={order.id} />
                    )}

                <Link
                    href={route("view-message", {
                        id:
                            orderedByUser.id === user.id
                                ? offer.thread.user_id
                                : orderedByUser.id,
                    })}
                >
                    <SecondaryButton>
                        Message{" "}
                        {orderedByUser.id === user.id
                            ? offer.thread.user.name
                            : orderedByUser.name}
                    </SecondaryButton>
                </Link>
            </div>

            <form
                onSubmit={onSaveOrder}
                encType="multipart/form-data"
                className=""
            >
                <div className="pt-4 pb-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-sm p-3">
                        <div>
                            <div className="flex items-center justify-between flex-wrap">
                                <h1 className="text-md font-bold">
                                    {orderedByUser.name}
                                </h1>
                                <h3 className="text-sm">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </h3>
                            </div>

                            <div className="bg-gray-100 mt-5 p-3">
                                <h1 className="font-bold text-sm">
                                    Offer Details
                                </h1>
                                <div className="text-xs flex flex-col md:flex-row gap-3">
                                    <div className="w-full md:w-[50%]">
                                        <div className="py-3">
                                            {/* <div className="font-bold">Description:</div> */}
                                            <div>{offer.description}</div>
                                        </div>
                                        <div>Price: {offer.price}</div>
                                        <div>
                                            Delivery Date:{" "}
                                            {new Date(
                                                offer.delivery_time
                                            ).toLocaleString()}
                                        </div>
                                        <div>Mode of Delivery: {offer.mod}</div>
                                        <div>Mode of Payment: {offer.mop}</div>
                                        <div>Net Days: {offer.net_days}</div>
                                    </div>

                                    <div className="w-full md:w-[50%]">
                                        <div className="text-xs">
                                            Attached Files:
                                        </div>

                                        {Object.entries(
                                            groupFilesByLabel(offer.files)
                                        ).map(([label, files]) => (
                                            <div key={label} className="mb-3">
                                                <div className="text-xs font-bold m-0">
                                                    {label.toUpperCase()}:
                                                </div>
                                                <ul>
                                                    {files.map((file) => (
                                                        <div
                                                            key={`file-${file.id}`}
                                                        >
                                                            <a
                                                                href={`/uploads/${file.file_name}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="m-0 mb-1 text-xs inline-block text-blue-600 hover:underline"
                                                            >
                                                                {file.file_name}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        <div className="mb-3">
                                            <div className="text-xs font-bold m-0">
                                                Purchase Order:
                                            </div>
                                            <ul>
                                                <div>
                                                    <a
                                                        href={`/uploads/${order.purchase_order}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="m-0 mb-1 text-xs inline-block text-blue-600 hover:underline"
                                                    >
                                                        {order.purchase_order}
                                                    </a>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    disabled={
                                        data.status != "Pending" ||
                                        !isManufacturer
                                    }
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
                                    options={getStatusOptions()}
                                    disabled={!isManufacturer}
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
                                    disabled={!isManufacturer}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.notes}
                                />
                            </div>
                        </div>

                        {order.proof_of_payment != null && (
                            <div className="mt-10">
                                <hr />
                                <div className="mt-5">
                                    <h1 className="font-bold">
                                        Proof of Payment:
                                    </h1>
                                    <div className="flex justify-center">
                                        <img
                                            className="max-w-[300px]"
                                            src={`/uploads/${order.proof_of_payment}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {order.proof_of_delivery != null && (
                            <div className="mt-10">
                                <hr />
                                <div className="mt-5">
                                    <h1 className="font-bold">
                                        Proof of Delivery/Picked Up:
                                    </h1>
                                    <div className="flex justify-center">
                                        <img
                                            className="max-w-[300px]"
                                            src={`/uploads/${order.proof_of_delivery}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {isManufacturer && (
                            <div className="mt-6 flex justify-end">
                                <PrimaryButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </form>

            {/* 
        to do: 

        manufacturer update price then 
        check mop and mod

        total_price = order price that macufacturer can adjust but just put in the notes

        
        if mod is pick up then mop is cod / cop 
                status are
                    pending
                    accepted / preparing your order
                    rejected / reason in the notes
                    preparing
                    ready to pick up
                    picked up

        if mod is deliver then mop is cod / cop
                status are
                    pending
                    accepted / preparing your order
                    rejected / reason in the notes
                    preparing
                    ship
                    delivered

        
        if mod is pick up then mop is online payment
                status are
                    pending
                    waiting for payment // customer will upload proof of payment in the order details
                    accepted / preparing your order
                    rejected / reason in the notes
                    preparing
                    ready to pick up
                    picked up
        
        if mod is deliver then mop is online payment
                    pending
                    waiting for payment // customer will upload proof of payment in the order details
                    accepted / preparing your order
                    rejected / reason in the notes
                    preparing
                    ship
                    deivered

        */}
        </AuthenticatedLayout>
    );
}
