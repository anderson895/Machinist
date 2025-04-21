import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "./Partials/PostInquiryForm";
import InquiryComponent from "./Partials/InquiryComponent";
import { useState } from "react";

export default function Inquiries() {
    const user = usePage().props.auth.user;
    const userList = usePage().props.users;
    const inquiries = usePage().props.inquiries;

    const [filter, setFilter] = useState(
        user.role == "user" ? "my inquiries" : "all"
    );

    const filteredInquiries = inquiries.filter((inquiry) => {
        if (filter == "my inquiries") {
            return inquiry.user_id == user.id;
        }

        if (
            Array.isArray(inquiry.allowed_viewers) &&
            inquiry.allowed_viewers.length > 0 &&
            user.role == "manufacturer" &&
            user.id != inquiry.user_id
        ) {
            return inquiry.allowed_viewers.some(
                (viewer) => viewer.user_id === user.id
            );
        }

        return true;
    });

    return (
        <AuthenticatedLayout
            header={
                user.role == "admin" ? (
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Inquiries
                    </h2>
                ) : (
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Inquiries
                        </h2>

                        <PostInquiryForm user={user} userList={userList} />
                    </div>
                )
            }
        >
            <Head title="Inquiries" />

            <div className="py-3 mx-auto max-w-7xl sm:px-6 lg:px-8 px-4 flex justify-end">
                {user.role == "manufacturer" && (
                    <div className="w-full md:w-[25%]">
                        <SelectInput
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            options={[
                                { value: "all", label: "All" },
                                {
                                    value: "my inquiries",
                                    label: "My Inquiries",
                                },
                            ]}
                        />
                    </div>
                )}
            </div>

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {filteredInquiries.map((inquiry) => (
                        <div
                            key={`inquiry-container-${inquiry.id}`}
                            className="mb-5"
                        >
                            <InquiryComponent
                                inquiry={inquiry}
                                userList={userList}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
