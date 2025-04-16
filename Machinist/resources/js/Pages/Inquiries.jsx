import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "./Partials/PostInquiryForm";
import InquiryComponent from "./Partials/InquiryComponent";

export default function Inquiries() {
    const user = usePage().props.auth.user;
    const inquiries = usePage().props.inquiries;

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

                        <PostInquiryForm user={user} />
                    </div>
                )
            }
        >
            <Head title="Inquiries" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {inquiries.map((inquiry) => (
                        <div
                            key={`inquiry-container-${inquiry.id}`}
                            className="mb-5"
                        >
                            <InquiryComponent inquiry={inquiry} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
